const CHALLENGES = [
{lang:"python",title:"Sum of Numbers",code:`def calculate_sum(numbers):
    total = 0
    for number in numbers:
        total += number
    return total

numbers = [10, 20, 30, 40]
print(calculate_sum(numbers))`},
{lang:"python",title:"Palindrome Check",code:`def is_palindrome(text):
    cleaned = text.lower().replace(" ", "")
    return cleaned == cleaned[::-1]

word = "level"
if is_palindrome(word):
    print("Palindrome")
else:
    print("Not a palindrome")`},
{lang:"python",title:"Fibonacci",code:`def fibonacci(n):
    a, b = 0, 1
    result = []
    for _ in range(n):
        result.append(a)
        a, b = b, a + b
    return result

print(fibonacci(10))`},
{lang:"python",title:"Frequency Counter",code:`def count_frequency(items):
    frequency = {}
    for item in items:
        frequency[item] = frequency.get(item, 0) + 1
    return frequency

data = ["a", "b", "a", "c", "b", "a"]
print(count_frequency(data))`},
{lang:"javascript",title:"Array Maximum",code:`function findMaximum(numbers) {
  let maximum = numbers[0];

  for (const number of numbers) {
    if (number > maximum) {
      maximum = number;
    }
  }

  return maximum;
}

console.log(findMaximum([12, 45, 7, 91, 33]));`},
{lang:"javascript",title:"Async Fetch",code:`async function loadUsers() {
  try {
    const response = await fetch("/api/users");
    const users = await response.json();
    console.log(users);
  } catch (error) {
    console.error("Request failed:", error);
  }
}

loadUsers();`},
{lang:"javascript",title:"Debounce",code:`function debounce(callback, delay) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

const search = debounce(query => {
  console.log("Searching:", query);
}, 300);`},
{lang:"javascript",title:"Object Destructuring",code:`const user = {
  name: "Alex",
  age: 22,
  role: "Developer"
};

const { name, age, role } = user;

console.log(name);
console.log(age);
console.log(role);`},
{lang:"java",title:"Binary Search",code:`static int binarySearch(int[] numbers, int target) {
    int left = 0;
    int right = numbers.length - 1;

    while (left <= right) {
        int middle = left + (right - left) / 2;

        if (numbers[middle] == target) {
            return middle;
        }

        if (numbers[middle] < target) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }

    return -1;
}`},
{lang:"java",title:"Student Class",code:`class Student {
    private String name;
    private int marks;

    Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }

    void display() {
        System.out.println(name + ": " + marks);
    }
}`},
{lang:"java",title:"Array Average",code:`public static double average(int[] values) {
    if (values.length == 0) {
        return 0;
    }

    int total = 0;
    for (int value : values) {
        total += value;
    }

    return (double) total / values.length;
}`},
{lang:"cpp",title:"Vector Sorting",code:`#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> numbers = {9, 2, 7, 4, 1};

    sort(numbers.begin(), numbers.end());

    for (int number : numbers) {
        cout << number << " ";
    }

    return 0;
}`},
{lang:"cpp",title:"Stack",code:`#include <iostream>
#include <stack>
using namespace std;

int main() {
    stack<int> values;

    values.push(10);
    values.push(20);
    values.push(30);

    while (!values.empty()) {
        cout << values.top() << endl;
        values.pop();
    }
}`},
{lang:"cpp",title:"Two Sum",code:`vector<int> twoSum(vector<int>& nums, int target) {
    for (int i = 0; i < nums.size(); i++) {
        for (int j = i + 1; j < nums.size(); j++) {
            if (nums[i] + nums[j] == target) {
                return {i, j};
            }
        }
    }

    return {};
}`},
{lang:"sql",title:"Employee Query",code:`SELECT
    department,
    COUNT(*) AS employee_count,
    AVG(salary) AS average_salary
FROM employees
WHERE salary > 30000
GROUP BY department
HAVING COUNT(*) >= 2
ORDER BY average_salary DESC;`},
{lang:"sql",title:"Join Query",code:`SELECT
    customers.name,
    orders.order_date,
    orders.total
FROM customers
INNER JOIN orders
    ON customers.id = orders.customer_id
WHERE orders.total > 1000
ORDER BY orders.order_date DESC;`},
{lang:"sql",title:"Update Records",code:`UPDATE employees
SET salary = salary * 1.10
WHERE department = 'Engineering'
  AND performance_rating >= 4;

SELECT id, name, salary
FROM employees
WHERE department = 'Engineering';`},
{lang:"sql",title:"Create Table",code:`CREATE TABLE projects (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    language VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_projects_language
ON projects(language);`}
];