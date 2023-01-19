using DailyDietAPI.Data;
using DailyDietAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DailyDietAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        private readonly DataContext _context;
        public FoodController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Food>>> GetAllFoods()
        {
            return Ok(await _context.Foods.ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<List<Food>>> CreateFood(Food food)
        {
            _context.Foods.Add(food);
            await _context.SaveChangesAsync();

            return Ok(await _context.Foods.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Food>>> UpdateFood(Food food)
        {
            var dbFood = await _context.Foods.FindAsync(food.Id);
            if (dbFood == null)
                return BadRequest("Food not found");

            dbFood.FoodName = food.FoodName;
            dbFood.Brand = food.Brand;
            dbFood.Category = food.Category;
            dbFood.Calories = food.Calories;
            dbFood.TotalFat = food.TotalFat;
            dbFood.Saturated = food.Saturated;
            dbFood.TotalCarb = food.TotalCarb;
            dbFood.TotalSugar = food.TotalSugar;
            dbFood.Fiber = food.Fiber;
            dbFood.Protein = food.Protein;
            dbFood.Calcium = food.Calcium;

            await _context.SaveChangesAsync();

            return Ok(await _context.Foods.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Food>>> DeleteFood(int id)
        {
            var dbFood = await _context.Foods.FindAsync(id);
            if (dbFood == null)
                return BadRequest("Food not found");

            _context.Foods.Remove(dbFood);
            await _context.SaveChangesAsync();

            return Ok(await _context.Foods.ToListAsync());
        }
    }
}
