using RandomUserGenerator.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RandomUserGenerator.Services
{
    public class UserService
    {
        // For now, we'll return hardcoded data instead of fetching from the external API
        public Task<List<User>> GetUsersAsync(int page = 1, int pageSize = 10)
        {
            // Return a hardcoded list of users
            var users = new List<User>
            {
                new User
                {
                    Id = Guid.NewGuid(),
                    FirstName = "John",
                    LastName = "Doe",
                    Email = "john.doe@example.com",
                    DateOfBirth = new DateTime(1985, 5, 15),
                    Phone = "123-456-7890",
                    Address = "123 Main St, Springfield, IL",
                    ProfilePicture = "https://randomuser.me/api/portraits/men/1.jpg"
                },
                new User
                {
                    Id = Guid.NewGuid(),
                    FirstName = "Jane",
                    LastName = "Smith",
                    Email = "jane.smith@example.com",
                    DateOfBirth = new DateTime(1990, 3, 22),
                    Phone = "987-654-3210",
                    Address = "456 Oak St, Springfield, IL",
                    ProfilePicture = "https://randomuser.me/api/portraits/women/1.jpg"
                }
                // Add more hardcoded users as needed
            };

            // Implement pagination by skipping and taking the appropriate users
            var pagedUsers = users.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            return Task.FromResult(pagedUsers);
        }

        public Task<User> GetUserByIdAsync(Guid id)
        {
            var user = new User
            {
                Id = id,
                FirstName = "John",
                LastName = "Doe",
                Email = "john.doe@example.com",
                DateOfBirth = new DateTime(1985, 5, 15),
                Phone = "123-456-7890",
                Address = "123 Main St, Springfield, IL",
                ProfilePicture = "https://randomuser.me/api/portraits/men/1.jpg"
            };

            return Task.FromResult(user);
        }

        public Task<List<User>> SearchUsersAsync(string query)
        {
            var users = new List<User>
            {
                new User
                {
                    Id = Guid.NewGuid(),
                    FirstName = "John",
                    LastName = "Doe",
                    Email = "john.doe@example.com",
                    DateOfBirth = new DateTime(1985, 5, 15),
                    Phone = "123-456-7890",
                    Address = "123 Main St, Springfield, IL",
                    ProfilePicture = "https://randomuser.me/api/portraits/men/1.jpg"
                },
                new User
                {
                    Id = Guid.NewGuid(),
                    FirstName = "Jane",
                    LastName = "Smith",
                    Email = "jane.smith@example.com",
                    DateOfBirth = new DateTime(1990, 3, 22),
                    Phone = "987-654-3210",
                    Address = "456 Oak St, Springfield, IL",
                    ProfilePicture = "https://randomuser.me/api/portraits/women/1.jpg"
                }
            };

            var filteredUsers = users.Where(u => u.FirstName.Contains(query) || u.LastName.Contains(query)).ToList();
            return Task.FromResult(filteredUsers);
        }
    }
}
