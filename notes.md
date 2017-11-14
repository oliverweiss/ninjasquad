# Ninja squad

## Angular course

Angular.js !== angular ( 2 -> 5 )

Current version: 5 (since oct. 2017)

Patch every week
Minor every month
Major every 6 months

Ponyracer

Reset after angular.js, future-proof
Based on typescript, ES6
Use web components (spec under construction)
angular.js design goals: quick and dirty proof of concepts
angular design goals: build fast and reliable goals, mobile first

Usable with ES5 (pas conseillé), ES6, Typescript

Composant angular !== web component

Composant angular: Typescript (logic) + Html (View)

Components tree

Components are encapsulated in a module.

Data goes down, events goes up in the components tree.

## ES6/Typescript

ES5(2009), ES6(2015), ES2015, ES2016, ES2017

Transpiler ES6, TS => ES5

Fix var scope issues: replace with let and const.

Template string

### Classes

Prototypical inheritance in js

```javascript
class Animal {
    speed() {
        return 10;
    }
}

// Inheritance (only for is-a!!)
class Pony extends Animal {
    // Constructor
    constructor(color) {
        this.color = color;
    }

    // Class method, fat arrow not supported
    toString() {
        return `${this.color} pony`;
    }

    // getter/setter, à la C#
    get color() {
        return this._color();
    }

    set color(color) {
        this._color = color;
    }
}

const bluePony = new Pony(blue);
```

### Promise

```javascript
getUser(login)
    .then(function(user){ return getRights(user);})
    .then(function(rights){ updateMenu(rights);})
    .catch(...);
```

Promise has 3 states: pending/success/failure
Store the result of an async operation.

```javascript
let promise =  new Promise(function(resolve, reject) {

});
```

### Arrow function

Fix this shenanigans

### Modules

Half assed. Only splitting, but loading is not specified.

Export/Import

Requires a bundler, like webpack. Builds a single file by following all imports. This implies that all imports must be static.

### Typescript

Typescript is a superset of ES6.
Compiler only, compiles to JS. Types are erased at runtime.

any: unrestricted type, useful for interaction with js

union types: ```number|boolean```

enum: ```enum State {Ready=1, Set, Go}```

Generic types: ```Array<Pony>```

Void, no return value: ```void```

Interface:

```javascript
    interface HasScore{
        score: number;
    }
    function incScore(player: HasScore, points) : void {
        player.score += points;
    }

    function incScore2(player: {score: number}, points) : void {
        player.score += points;
    }
```

Optional arguments: add ```?```

Properties declaration shorthand:

```javascript
class X {
    constructor(public prop1: string, private prop2: number){}
}
// Is equivalent to
class X {
    public prop1: string;
    private prop2: number;

    constructor(prop1: string, prop2: number){
        this.prop1 = prop1;
        this.prop2 = prop2;
    }
}
```

Typings: equivalent to .h files in C/C++
Filetype is .d.ts
Availaible for most popular js libraries in definitelytyped.

Decorators: annotations on classes or fields

## Bootstrap an app

## Component & Templates

## Dependency Injection

## Observables

## Tests

## Forms/Http/Router

## l10n/i18n/etc
