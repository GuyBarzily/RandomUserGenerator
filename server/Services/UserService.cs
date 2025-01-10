using RandomUserGenerator.Models;
using RandomUserGenerator.Data;
using Microsoft.EntityFrameworkCore;

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
        private readonly AppDbContext _context;


        public UserService(HttpClient httpClient, AppDbContext context)
        {
            _httpClient = httpClient;
            _context = context;
        }

        // Fetch users from the Random User Generator API with pagination
        public async Task<List<User>> GetUsersAsync(int page = 1, int pageSize = 10)
        {
            // Calculate skip/take for pagination
            int skip = (page - 1) * pageSize;

            // Check if users are already cached
            var cachedUsers = _context.Users
                .OrderBy(u => u.CachedAt)
                .Skip(skip)
                .Take(pageSize)
                .ToList();

            // If users are found in the cache, return them
            if (cachedUsers.Any())
            {
                return cachedUsers;
            }

            // Fetch users from the API if not cached
            var url = $"https://randomuser.me/api/?page={page}&results={pageSize}";
            var response = await _httpClient.GetStringAsync(url);
            var apiResponse = JsonConvert.DeserializeObject<RandomUserApiResponse>(response);

            var users = apiResponse.Results.Select(r => new User
            {
                Id = Guid.NewGuid(),
                FirstName = r.Name.First,
                LastName = r.Name.Last,
                Email = r.Email,
                DateOfBirth = DateTime.Parse(r.Dob.Date),
                Phone = r.Phone,
                Address = $"{r.Location.Street.Number} {r.Location.Street.Name}, {r.Location.City}, {r.Location.State}, {r.Location.Country}",
                ProfilePicture = r.Picture.Large,
                CachedAt = DateTime.UtcNow
            }).ToList();

            // Save fetched users to the database for caching
            await _context.Users.AddRangeAsync(users);
            await _context.SaveChangesAsync();

            return users;
        }


        // Fetch a specific user by ID (hardcoded for now, modify as per actual requirement)
            public async Task<User> GetUserByIdAsync(Guid id)
            {
                var user = await _context.Users.FindAsync(id);

                // Return the user if found, otherwise throw an exception or return null (depending on your requirements)
                if (user == null)
                {
                    throw new KeyNotFoundException($"User with Id {id} was not found.");
                }

                return user;
            }


        public async Task<List<User>> SearchUsersAsync(string query)
        {
            // Perform a case-insensitive search on the database context
            var filteredUsers = await _context.Users
                .Where(u => u.FirstName.Contains(query) || u.LastName.Contains(query))
                .OrderBy(u => u.FirstName)
                .ThenBy(u => u.LastName)
                .ToListAsync();

            return filteredUsers;
        }


    }
}
