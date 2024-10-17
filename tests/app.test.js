const request = require("supertest");
const http = require("http");
const { getAllEmployees } = require("../controller");
const { app } = require("../index.js");

jest.mock("../controller.js", () => {
  const actualModule = jest.requireActual("../controller.js");
  return {
    ...actualModule,
    getAllEmployees: jest.fn(),
  };
});

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Controller Function Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it("Should return all employees", () => {
    let mockEmployees = [
      {
        employeeId: 1,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        departmentId: 1,
        roleId: 1,
    },
    {
        employeeId: 2,
        name: 'Priya Singh',
        email: 'priya.singh@example.com',
        departmentId: 2,
        roleId: 2,
    },
    {
        employeeId: 3,
        name: 'Ankit Verma',
        email: 'ankit.verma@example.com',
        departmentId: 1,
        roleId: 3,
    },
    ];

    getAllEmployees.mockReturnValue(mockEmployees);
    let result = getAllEmployees();
    expect(result).toEqual(mockEmployees);
    expect(result.length).toBe(3);
  });
});

describe("API Endpoints Tests", () => {
  it("GET /employees should get all employees", async () => {
    const response = await request(server).get("/employees");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      employees: [
        {
          employeeId: 1,
          name: 'Rahul Sharma',
          email: 'rahul.sharma@example.com',
          departmentId: 1,
          roleId: 1,
      },
      {
          employeeId: 2,
          name: 'Priya Singh',
          email: 'priya.singh@example.com',
          departmentId: 2,
          roleId: 2,
      },
      {
          employeeId: 3,
          name: 'Ankit Verma',
          email: 'ankit.verma@example.com',
          departmentId: 1,
          roleId: 3,
        },
      ],
    });
    expect(response.body.employees.length).toBe(3);
  });
 
  it("GET /employees/details/:id", async () => {
    const response = await request(server).get("/employees/details/1");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
     employee: {
      employeeId: 1,
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      departmentId: 1,
      roleId: 1,
     },
    });
  });

});