import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import Chance from 'chance';

const chance = new Chance();

const AuthButton = ({ loggedIn, handleLogout, handleLogin }) => {
  const handleLoginClick = () => {
    if (loggedIn) {
      handleLogout();
    } else {
      handleLogin();
    }
  };

  return (
    <button className="btn btn-primary float-end" onClick={handleLoginClick}>
      {loggedIn ? 'Logout' : 'Login'}
    </button>
  );
};

const LookupForm = ({ handleLogout }) => {
  const [forms, setForms] = useState([]);
  const [sortField, setSortField] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('asc');
  const [employmentStatusFilter, setEmploymentStatusFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchForms = async () => {
      try {
        let formsData = [];

        let formsRef = firebase.firestore().collection('submissions');

        if (departmentFilter !== '') {
          formsRef = formsRef.where('department', '==', departmentFilter);
        }

        if (employmentStatusFilter !== '') {
          formsRef = formsRef.where('employmentStatus', '==', employmentStatusFilter);
        }

        // if (sortField && sortOrder) {
        //   formsRef = formsRef.orderBy(sortField, sortOrder)
        // }

        // NOTE: Firebase doesn't support ordering by multiple fields in a single query

        const formsSnapshot = await formsRef.get();
        formsSnapshot.docs.forEach((doc) => {
          formsData.push({ id: doc.id, ...doc.data() });
        });

        if (formsData.length === 0) {
          // Generate random data if the forms collection is empty
          for (let i = 0; i < 100; i++) {
            const randomData = generateRandomData();
            const docRef = await firebase.firestore().collection('submissions').add(randomData);
            formsData.push({ id: docRef.id, ...randomData });
          }
        }

        // Sort the forms based on the selected sortField and sortOrder
        if (sortField !== '' && sortOrder !== '') {
          formsData.sort((a, b) => {
            if (sortField === 'timestamp') {
              const timestampA = parseInt(a[sortField]);
              const timestampB = parseInt(b[sortField]);
              return sortOrder === 'asc' ? timestampA - timestampB : timestampB - timestampA;
            } else {
              return sortOrder === 'asc' ? a[sortField].localeCompare(b[sortField]) : b[sortField].localeCompare(a[sortField]);
            }
          });
        }        

        setForms(formsData);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, [sortField, sortOrder, departmentFilter, employmentStatusFilter]);

  const generateRandomData = () => {
    const id = chance.natural({ min: 100000000, max: 999999999 }).toString();
    const timestamp = chance.date({ year: 2022 }).getTime().toString();

    return {
      name: chance.name(),
      id,
      department: chance.pickone(['Sales', 'Marketing', 'Finance', 'Human Resources']),
      employmentStatus: chance.pickone(['Full-time', 'Part-time', 'Contract', 'Intern']),
      email: chance.email(),
      accommodationRequest: chance.paragraph({ sentences: 2 }),
      fileUrl: null,
      timestamp,
    };
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'America/Los_Angeles',
      timeZoneName: 'short',
    };
    return date.toLocaleString('en-US', options);
  };

  const handleSortFieldChange = (e) => {
    setSortField(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleDepartmentFilterChange = (e) => {
    setDepartmentFilter(e.target.value);
  };

  const handleEmploymentStatusFilterChange = (e) => {
    setEmploymentStatusFilter(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredForms = forms.filter((form) => {
    const { name, email, accommodationRequest } = form;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return (
      name.toLowerCase().includes(lowerCaseSearchTerm) ||
      email.toLowerCase().includes(lowerCaseSearchTerm) ||
      accommodationRequest.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  const renderFileLink = (fileUrl) => {
    if (fileUrl) {
      const splitUrl = fileUrl.split('%2F');
      const fileNameWithToken = splitUrl[splitUrl.length - 1];
      const fileName = decodeURIComponent(fileNameWithToken.split('?')[0]);
      return (
        <a href={fileUrl} download={fileName} target="_blank" rel="noopener noreferrer">
          Download
        </a>
      );
    } else {
      return 'None';
    }
  };

  const highlightText = (text, searchTerm) => {
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    if (!searchTerm || searchTerm === '') return text;
    return text.replace(regex, '<mark>$1</mark>');
  };

  return (
    <div className="container">
      <h4 className="text-center mb-4">Lookup Form</h4>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="sortField" className="form-label">
            Order by:
          </label>
          <select
            className="form-select"
            id="sortField"
            value={sortField}
            onChange={handleSortFieldChange}
          >
            <option value="name">Name</option>
            <option value="id">ID</option>
            <option value="timestamp">Timestamp</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="sortOrder" className="form-label">
            Order:
          </label>
          <select
            className="form-select"
            id="sortOrder"
            value={sortOrder}
            onChange={handleSortOrderChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="departmentFilter" className="form-label">
            Department Filter:
          </label>
          <select
            className="form-select"
            id="departmentFilter"
            value={departmentFilter}
            onChange={handleDepartmentFilterChange}
          >
            <option value="">All</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="Human Resources">Human Resources</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="employmentStatusFilter" className="form-label">
            Employment Status Filter:
          </label>
          <select
            className="form-select"
            id="employmentStatusFilter"
            value={employmentStatusFilter}
            onChange={handleEmploymentStatusFilterChange}
          >
            <option value="">All</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Intern">Intern</option>
          </select>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="searchTerm" className="form-label">
          Search:
        </label>
        <input
          type="text"
          className="form-control"
          id="searchTerm"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>

      <table className="table mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Department</th>
            <th>Employment Status</th>
            <th>Email</th>
            <th>Accommodation Request</th>
            <th>Uploaded File</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {filteredForms.map((form) => (
            <tr key={form.id}>
              <td dangerouslySetInnerHTML={{ __html: highlightText(form.name, searchTerm) }}></td>
              <td dangerouslySetInnerHTML={{ __html: highlightText(form.id, searchTerm) }}></td>
              <td>{form.department}</td>
              <td>{form.employmentStatus}</td>
              <td dangerouslySetInnerHTML={{ __html: highlightText(form.email, searchTerm) }}></td>
              <td dangerouslySetInnerHTML={{ __html: highlightText(form.accommodationRequest, searchTerm) }}></td>
              <td>{renderFileLink(form.fileUrl)}</td>
              <td>{formatTimestamp(form.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


const SubmissionForm = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [department, setDepartment] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [email, setEmail] = useState('');
  const [accommodationRequest, setAccommodationRequest] = useState('');
  const [file, setFile] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setLoggedIn(!!user);
    });
  }, []);

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword('user1@gmail.com', '123456');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred while logging in. Please try again.');
    }
  };


  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload the file to Firebase Storage if a file is selected
      let fileUrl = null;
      if (file) {
        const storageRef = firebase.storage().ref(`documents/${file.name}`);
        await storageRef.put(file);
        fileUrl = await storageRef.getDownloadURL();
      }

      // Create a new document in the "documents" collection
      await firebase.firestore().collection('submissions').add({
        name,
        id,
        department,
        employmentStatus,
        email,
        accommodationRequest,
        fileUrl,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      // Clear form fields after successful submission
      setName('');
      setId('');
      setDepartment('');
      setEmploymentStatus('');
      setEmail('');
      setAccommodationRequest('');
      setFile(null);

      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again later.');
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div>
      <AuthButton loggedIn={loggedIn} handleLogout={handleLogout} handleLogin={handleLogin} />
      {loggedIn ? (
        <LookupForm handleLogout={handleLogout} />
      ) : (
        <div className="container">
          <h4 className="text-center mb-4">Submission Form</h4>
          <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="id" className="form-label">
                ID:
              </label>
              <input
                type="text"
                className="form-control"
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="department" className="form-label">
                Department:
              </label>
              <select
                className="form-control"
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              >
                <option value="">Select Department</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="Human Resources">Human Resources</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="employmentStatus" className="form-label">
                Employment Status:
              </label>
              <select
                className="form-control"
                id="employmentStatus"
                value={employmentStatus}
                onChange={(e) => setEmploymentStatus(e.target.value)}
                required
              >
                <option value="">Select Employment Status</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Intern">Intern</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="accommodationRequest" className="form-label">
                Accommodation Request:
              </label>
              <textarea
                className="form-control"
                id="accommodationRequest"
                value={accommodationRequest}
                onChange={(e) => setAccommodationRequest(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="file" className="form-label">
                File:
              </label>
              <input
                type="file"
                className="form-control"
                id="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SubmissionForm;



