using RandomUserGenerator.Models;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace RandomUserGenerator.Services
{
    public class UserService
    {
        private readonly HttpClient _httpClient;

        public UserService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        // Fetch users from the Random User Generator API with pagination
        public async Task<List<User>> GetUsersAsync(int page = 1, int pageSize = 10)
        {
            var url = $"https://randomuser.me/api/?page={page}&results={pageSize}";

            var response = await _httpClient.GetStringAsync(url);
            var apiResponse = JsonConvert.DeserializeObject<RandomUserApiResponse>(response);

            var users = apiResponse.Results.Select(r => new User
            {
                Id = Guid.NewGuid(), // Random User API doesn't provide GUID, we generate one
                FirstName = r.Name.First,
                LastName = r.Name.Last,
                Email = r.Email,
                DateOfBirth = DateTime.Parse(r.Dob.Date),
                Phone = r.Phone,
                Address = $"{r.Location.Street.Number} {r.Location.Street.Name}, {r.Location.City}, {r.Location.State}, {r.Location.Country}",
                ProfilePicture = r.Picture.Large
            }).ToList();

            return users;
        }

        // Fetch a specific user by ID (hardcoded for now, modify as per actual requirement)
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

        // Search for users based on a query (name search)
        public async Task<List<User>> SearchUsersAsync(string query)
        {
            var url = $"https://randomuser.me/api/?results=1000"; // Fetch more users to allow search

            var response = await _httpClient.GetStringAsync(url);
            var apiResponse = JsonConvert.DeserializeObject<RandomUserApiResponse>(response);

            var filteredUsers = apiResponse.Results
                .Where(u => u.Name.First.Contains(query) || u.Name.Last.Contains(query))
                .Select(u => new User
                {
                    Id = Guid.NewGuid(),
                    FirstName = u.Name.First,
                    LastName = u.Name.Last,
                    Email = u.Email,
                    DateOfBirth = DateTime.Parse(u.Dob.Date),
                    Phone = u.Phone,
                    Address = $"{u.Location.Street.Number} {u.Location.Street.Name}, {u.Location.City}, {u.Location.State}, {u.Location.Country}",
                    ProfilePicture = u.Picture.Large
                })
                .ToList();

            return filteredUsers;
        }
    }
}
