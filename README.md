# Agile Sprint Planner

## Project Scope

### Description:
A project planning app for planning sprints. Can allocate tasks to sprints, assign team members, track time and store relevant project information. 

### Why:
I wanted to do a project that combines what I have been learning with CodeClan and the Open University module I am studying which focuses on using Agile methods for software development. I also wanted to have an app with professional/corporate looking styling, learn basic authentication and explore some React libraries for creating diagrams. 

### MVP Acceptance Criteria:
- Can add a project, add a prioritised product backlog of tasks/user stories, create a new sprint for that project and add product backlog tasks/user stories to the sprint. Tasks can be drag/dropped between different lists (e.g., To Do, Doing, Stuck, Done). 

- Include time tracking/scheduling. Estimated times for each task must fit within the length of the sprint. Users can log time spent on each task to track progress. Burndown chart records progress against plan.  

- Secure login authentication for users (for example JWT). 

### Potential Extensions:
- Add team member availability and task breakdown for more accurate scheduling. 

- Add alerts if tasks are running late. 

- Add React library to allow diagrams to be created and saved such as use case diagrams, class diagrams etc. 

- Ability to record additional project information such as issues, customer feedback etc. 

- Different permissions/actions based on roles (e.g., only a Product Owner can add tasks to a sprint. If a task is added to the “Stuck” column the Scrum Master is automatically allocated to the task so that they are given the action to help resolve the issue). 

### Risks:
- Do not know how to use authentication. Mitigation is that there is a CodeClan lesson on this that I can work through and resources online for options such as JWTs.  

- There is a risk that the app could get complicated quite quickly with lots of options for different features. The focus will be on getting a very basic version all connected and working with the selected Libraries before trying to add more complex ideas. 

### Exclusions:
N/A

### Prerequisites:
Selection and testing of appropriate libraries before starting to code.  

- React Bootstrap for css.  

- React-beautiful-dnd for drag/drop lists. 

- Authentication lesson. 

- Diagram.js (before starting extensions)
