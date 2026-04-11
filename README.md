# Film Haven
Welcome to the official Github repository of Film Haven!

View the final website on [Replit](http://replit.com/@JeromeFoster2/final-movie-proj-1).

## What is this?
Film Haven is a place where you can discover new films, watch trailers, and share your thoughts on popular movies.
This project was put together by [Aaron Augustin](https://github.com/AnimatingLegend), & [Jerome Foster](https://github.com/Yamuu07) to enhance the experience of searching, and reviewing movies. Think of it as Rotten Tomatos, or Letterbox, but better!

## Building / Compiling
### 1. Install the GitHub Repo locally:
```bash
git clone https://github.com/AaronAugustin/Film-Haven.git
```
### 2. Run the following command to download the following NPM Depdendencies:
```bash
npm install
```
If not all of the depdencies installed, then type them in manually.
#### Included Depedencies:
- `cookie-parser`, `debug`, `ejs`, `express`, `http-errors`, `morgan`, `tmdb-js-wrapper`, `winston`
### 3. Build the language.
Run the following command to create both a `dist/` directory.
```bash
npm start
```
#### Building Flags
- `npm run dev`
     * To program while the code runs. This build flag features an HMR (Hot Module Replacement), which will automatically refresh the your build everytime you make changes in your code.
- `npm run build`
     * Compile the entire Film-Haven website into a `dist/` directory for faster loading times.