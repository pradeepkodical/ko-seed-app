# ko-seed-app
This is a seed app for ko with yarn.
Uses latest ko library, jquery and sammyjs for routing.


# install dependencies
```
yarn 
```

# run the project
```
yarn start
```

# create production build
```
yarn build
```

# notes
This uses the latest styles from bootstrap. 
You can solve all of the layout issues using css grid and flex grid, which I have used here.

# keep in mind
Always start designing the styles for mobile and then implement to larger screens.

```
/*For mobile*/
.your-element {
  width: 100px;
}

/*For small device*/
@media only screen and (min-width: 468px) {
  .your-element {
    width: 100%;
  }
}

/*For medium device*/
@media only screen and (min-width: 768px) {
  .your-element {
    width: 50%;
  }
}
/*For large device*/
@media only screen and (min-width: 1028px) {
  .your-element {
    width: 25%;
  }
}
```
