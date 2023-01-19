﻿// <auto-generated />
using System;
using DailyDietAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DailyDietAPI.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20230118133147_ChangePropertiesToNullable")]
    partial class ChangePropertiesToNullable
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("DailyDietAPI.Models.Food", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Brand")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float?>("Calcium")
                        .HasColumnType("real");

                    b.Property<int>("Calories")
                        .HasColumnType("int");

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<float?>("Fiber")
                        .HasColumnType("real");

                    b.Property<string>("FoodName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("Protein")
                        .HasColumnType("real");

                    b.Property<float?>("Saturated")
                        .HasColumnType("real");

                    b.Property<float>("TotalCarb")
                        .HasColumnType("real");

                    b.Property<float>("TotalFat")
                        .HasColumnType("real");

                    b.Property<float?>("TotalSugar")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.ToTable("Foods");
                });
#pragma warning restore 612, 618
        }
    }
}
