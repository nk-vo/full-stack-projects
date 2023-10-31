using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Activity
    {
        public Guid Id { get; set; } // Guid is a unique identifier
        public string Title { get; set; } // Title of the activity
        public DateTime Date { get; set; } // Date of the activity
        public string Description { get; set; } // Description of the activity
        public string Category { get; set; } // Category of the activity
        public string City { get; set; } // City of the activity
        public string Venue { get; set; } // Venue of the activity 
    }
}