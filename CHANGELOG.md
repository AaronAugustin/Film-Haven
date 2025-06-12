# Changelog
All notable changes will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Changed
- Complete Website overhaul
    - Updated home page
        - Navagation bar
        - You can now save movies
        - You can now select a language from your region (EN & ES are only available)
    - Updated login screen (Identical to the IMDb login screen)

## [0.2.1] - 2025-05-02
### Added
- Implemented pagination for displaying a limited number of movies per page
- Basic Signup Functionality
    - Just a shitton of copy & pasting of the login / logout functions lol
- A warning message to inform people to get an ``api_key`` before using the site
### Changed
- Made a message to inform you that you need a API Key before using the site
    - in order to get one go to [TMDb API](https://developer.themoviedb.org/docs/getting-started) to signup today

## [0.2.0] - 2025-04-28
### Added
- Login / Logout functionality
    - Basic login page.
    - Uses ``localStorage.setItem()`` to get basic functionality out of the site.
- Node Dependencies ([install before cloning the source code!](https://nodejs.org/en/download))
    - TMDb: ``npm install tmdb-js-wrapper``
    - Chalk ``npm install chalk`` (optional)
- Crash page that redirects to the main page (debug purposes)
### Changed
- Movies are now displayed in a conveyor belt type form instead of a long column
- Backend Changes
### Fixed
-  Issue where you have to refresh the site to get a different genre of movies.

## [0.1.0] - 2025-04-01
- The initial ~~public~~ release of Film Haven
### Added
- Basic [TMDb API](https://developer.themoviedb.org/docs/getting-started) functionality
    - Made a datalist to fetch the most latest movies from certain genres
### Changed
- A lot of backend changes
    - Figuring out API functionality
