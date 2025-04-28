# Changelog
All notable changes will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Add
- Implemened pagination for displaying a limited number of movies per page

## [0.2.0] - 2025-28-04
### Added
- Login / Logout functionality
    - Basic login page.
    - Uses ``localStorage.setItem()`` to get basic functionality out of the site.
- Node Dependencies ([install before cloning the source code!](https://nodejs.org/en/download))
    - TMDb: ``npm install tmdb-js-wrapper``
    - Chalk ``npm install chalk``
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
