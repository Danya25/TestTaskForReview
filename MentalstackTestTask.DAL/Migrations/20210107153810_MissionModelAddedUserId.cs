using Microsoft.EntityFrameworkCore.Migrations;

namespace MentalstackTestTask.DAL.Migrations
{
    public partial class MissionModelAddedUserId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Missions",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Missions");
        }
    }
}
