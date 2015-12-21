# rev-node
auto add/replace html file content in the .css and .js suffix

## Step

```
  node index.js (your html directory) [personal sign]
```

## Example

```
  node index.js pages v=
```

### Original content

```
  <link href="style.css" />
  <script type="text/javascript" src="app.js">
```

### Compiled content

```
  <link href="style.css?v=timestamp" />
  <script type="text/javascript" src="app.jsv=timestamp">
```
