export interface User {
    id: string;  // Assuming user ID is a string (could also be a Guid if necessary)
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;  // Store dates as strings or use Date type if necessary
    phone: string;
    address: string;
    profilePicture: string;
  }
  