namespace RandomUserGenerator.Models
{
    public class RandomUserApiResponse
    {
        public List<RandomUser> Results { get; set; }
    }

    public class RandomUser
    {
        public Name Name { get; set; }
        public string Email { get; set; }
        public Dob Dob { get; set; }
        public string Phone { get; set; }
        public Location Location { get; set; }
        public Picture Picture { get; set; }
    }

    public class Name
    {
        public string First { get; set; }
        public string Last { get; set; }
    }

    public class Dob
    {
        public string Date { get; set; }
    }

    public class Location
    {
        public Street Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
    }

    public class Street
    {
        public string Name { get; set; }
        public int Number { get; set; }
    }

    public class Picture
    {
        public string Large { get; set; }
    }
}
