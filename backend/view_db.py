#!/usr/bin/env python3
import sqlite3
import sys

def view_database():
    conn = sqlite3.connect('school.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    tables = ['students', 'teachers', 'courses', 'enrollments']
    
    for table in tables:
        print(f"\n=== {table.upper()} ===")
        cursor.execute(f"SELECT * FROM {table}")
        rows = cursor.fetchall()
        
        if rows:
            # Print column headers
            print(" | ".join([col[0] for col in cursor.description]))
            print("-" * 50)
            
            # Print data
            for row in rows:
                print(" | ".join([str(val) for val in row]))
        else:
            print("No data found")
    
    conn.close()

if __name__ == "__main__":
    view_database()