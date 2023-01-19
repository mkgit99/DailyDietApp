using System.ComponentModel.DataAnnotations;

namespace DailyDietAPI.Models
{
    public class Food
    {
        [Key]
        public int Id { get; set; }
        public string FoodName { get; set; } = string.Empty;
        public string? Brand { get; set; }
        public string Category { get; set; } = string.Empty;
        public int Calories { get; set; }
        public float TotalFat { get; set; }
        public float? Saturated { get; set; }
        public float TotalCarb { get; set; }
        public float? TotalSugar { get; set; }
        public float? Fiber { get; set; }
        public float Protein { get; set; }
        public float? Calcium { get; set; }


    }
}
