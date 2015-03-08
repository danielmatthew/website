## Ember
Javascript web application framework based on MVC
“SPA”
- Rich object model
- declarative two-way data-binding

Routes
Models
Controllers
Templates
	Written in Handlebars
Views
	Add reusable behaviour to template
Components
	Specialised view allowing creation of custom templates

Ember Data - library that maps models to server side data. Like ORM? 

## Angular

### Directives
Fundamental building block of Angular applications
Designed as small modules to be reused

### Factories
Used to maintain one single instance. Often used for maintaining state. Can be used to provide an abstraction layer between directives snd APIs.

### Controllers
Similar functionality to directives, but predominantly used just for data connections and associated logical restraints. Can’t contain templating or complex ordering.

### Filters
Used to implement temporary transformations of data as it travels between the model and the view. Eg. uppercasing original data.

#### ng-click
Directive that allows you to execute an action when a user clicks on an element
