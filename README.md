## Software Sauna Code Challenge Solution

Node/TypeScript/Jest solution to the ASCII map path finding algorithm found [here](https://github.com/softwaresauna/code-challenge).

To start the tests, run:
```
yarn install && yarn test
```
Requires node >= 12.

Some notes:
- main solution is `src/followPath.ts`, and the main assertion tests `src/__tests__/followPath.test.ts`
- examples are read fully and synchronously from txt files into arrays of strings (no optimization with loading the files, didn't seem necessary)
- start and end values validation is done prior to starting the traversal algorithm (seemed simple and good enough, would need more expected behaviour info to implement those validations during traversal)
- solution uses recursion, did not care about max callstack (would implement differently if this was an issue, ex if the files and paths were really huge)
- not sure if that's wanted behaviour, but solution allows crossing over several lines of intersections
- I'm not very experienced (yet) at writing nice unit tests:
  - for readability, I like having multiple expects in a single test if they are using different input values for testing the same aspect of a function, though it might not run all the tests if something fails
  - probably should have written more detailed tests for traversal logic
  - probably should have tested errors more explicitly
- I was a bit confused with the *"It does not matter what lies beyond x"* and *"The path cannot have multiple endings"*, I find those 2 statements contradictory, or I misunderstood them (which affects the third point)