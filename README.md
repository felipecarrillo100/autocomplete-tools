# react-bootstrap-submenu
A React Typescript module that provides autocomplete components. It requires Bootstrap > 1.0

## How to install:
npm install autocomplete-tools

## How to include
Code is available in javascript and TypeScript versions

### Step 1: Import the code
```javascript
import { AutoComplete, AutoCompleteAjax } from "autocomplete-tools";
```

###Step 2: Import the styles:
Make sure you include the styles in your project. Versions in css and scss are available
* css: autocomplete-tools/css/styles.css
* scss: autocomplete-tools/scss/styles.scss

NOTE: If you use the scss version, then make sure you include bootstrap.scss first to make sure the color variables are defined.
## To use
Add the component to a Form as you would do with any other React-Boostrap form control

* AutoComplete: Component to autocomplete from elements from an in memory array
* AutoCompleteAjax: Component to autocomplete from elements received from an external API via AJAX
 
Javascript example:
```javascript
<Form>
    <Form.Group controlId="test2-id">
        <Form.Label>Array example</Form.Label>
        <AutoComplete data={CountriesList} onSelect={doSomething} initialText={initialText} keyString={"name"} customRender={customRender}/>
    </Form.Group>
    <Form.Group controlId="test1-id">
        <Form.Label>Select Airport</Form.Label>
        <AutoCompleteAjax query={ajaxQuery} onSelect={(x: AirportTable) => setX(x)} initialText={""} keyString={"name"} customRender={renderAirport} placeholder="Type to search"/>
    </Form.Group>
</Form>
```  
Typescript Example:
You can inforce type by using the <mytype> operators <>

Step 1: Define the type for your own data:
```javascript
interface Employee {
    id: number;
    name: string;
    lastname: string;
}
```  
Step 2: Use the type when creating the component
```javascript
<Form>
    <Form.Group controlId="test2-id">
        <Form.Label>Array example</Form.Label>
        <AutoComplete<Employee> data={CountriesList} onSelect={(country: Employee) => setcountry(country)} initialText={initialText} keyString={"name"} customRender={customRender}/>
    </Form.Group>
    <Form.Group controlId="test1-id">
        <Form.Label>Select Airport</Form.Label>
        <AutoCompleteAjax<Employee> query={ajaxQuery} onSelect={(x: Employee) => setX(x)} initialText={""} keyString={"name"} customRender={renderAirport} placeholder="Type to search"/>
    </Form.Group>
</Form>
```  

## Props
  * data: An array containing the autocompare available values  [{id:123, name: "some text", other:"""}, ...]
  * onSelect: A call back function that will be called when an element is selected: (item) => dosomething(item)
  * initialText: The text that will be show when you first show the element
  * keyString: The name of the key that provides the string to search
  * customRender: Optional parameter. By default, the value of string is rendered as text. You can create a custom render for the items in the list
  * placehoder: The text to display when the input is empty
  * query: a function that returns the paramteters required to perform the ajax query.

### Call back Examples
Example of AjaxQuery:
```javascript
    const ajaxQuery = (q) => {
      const queryString = "https://demo.luciad.com/airports/search/?limit=10&q="+q;
      const headers = {};
      return {
          queryString,
          headers
      }
    }
```
* Note: Internally AutoCompleteAjax uses 'fetch', so the parameters passed in the return are compatibles with it. 

Example for custom render:
```javasctipt
const customRender = (item) => (
      <>
          <p className="mb-0 font-weight-bold line-height-1">
              {item.name}{" "}
              <img src={item.flag} alt="flag" style={{ width: "30px" }} />
          </p>
          <Badge variant="primary">{item.region}</Badge>
          <Badge variant="secondary">{item.capital}</Badge>
      </>
  )
```
### Code sandbox
A small code sandbox can be found here:
https://codesandbox.io/s/autocomplete-tools-08l5h