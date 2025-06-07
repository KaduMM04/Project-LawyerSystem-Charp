using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Project_LawyerSystem_CharpApi.Migrations
{
    /// <inheritdoc />
    public partial class AddedSituation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreateAt",
                table: "Cases",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Situation",
                table: "Cases",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdateAt",
                table: "Cases",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            // ALTERAÇÃO MANUAL COM USING
            migrationBuilder.Sql(
                "ALTER TABLE \"CaseEvents\" ALTER COLUMN \"EventDate\" TYPE timestamp with time zone USING \"EventDate\"::timestamp with time zone;");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreateAt",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "Situation",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "UpdateAt",
                table: "Cases");

            migrationBuilder.AlterColumn<string>(
                name: "EventDate",
                table: "CaseEvents",
                type: "character varying(10)",
                maxLength: 10,
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");
        }
    }
}
