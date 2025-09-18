const axios = require('axios');
const {program} = require('commander');

// Local Imports
const {API_BASE_URL, TMDB_API_KEY} = require('./configs/env');


// 1. Setup Program
program
    .version("1.0.0")
    .name('tmdb-cli-tool')
    .description('A CLI tool to interact with The Movie Database (TMDB) API')
    .option('-t, --type <type>', 'Type of movies to fetch: popular, top_rated, upcoming, now_playing')
    .parse(process.argv);

// 2. Define Function
async function fetchMovies() {
    const options = program.opts();

    if (!options.type) {
        console.error('Error: Please specify a movie type using the -t or --type option.');
        program.help(); // Display help and exit
       return;
    }

//     3. Convert type to endpoint
    const movieTypeMap = {
        popular: 'popular',
        top_rated: 'top_rated',
        upcoming: 'upcoming',
        now_playing: 'now_playing'
    }

    const endpoint = movieTypeMap[options.type];

    if (!endpoint) {
        console.error('Error: Invalid movie type. Valid types are: popular, top_rated, upcoming, now_playing');
        return;
    }

//     4. Create API
    const url = `${API_BASE_URL}/${endpoint}?api_key=${TMDB_API_KEY}`;

    try{
        console.log("Fetching data from TMDB...");

        const response = await axios.get(url);
        const movies = response.data.results;

    //     5. Display Result
        if (movies.length === 0){
            console.log('No movies found.');
            return;
        }

        console.log(`\n--- Top 10 ${options.type.charAt(0).toUpperCase() + options.type.slice(1)} Movies ---\n`);

        movies.slice(0, 10).forEach(movie => {
            console.log(`🎬 Title: ${movie.title}`);
            console.log(`   Release Date: ${movie.release_date}`);
            console.log(`   Rating: ${movie.vote_average.toFixed(1)}/10`);
            console.log(`   Overview: ${movie.overview}\n`);
        })

    }catch(error){
        // 6. Handle Error
        if (error.response) {
            // API ตอบกลับมาด้วย status code ที่ไม่ใช่ 2xx
            console.error(`Error: Failed to fetch data from TMDB. Status code: ${error.response.status}`);
            console.error(`Message: ${error.response.data.status_message}`);
        } else if (error.request) {
            // Request ถูกส่งไปแต่ไม่ได้รับการตอบกลับ (เช่น ปัญหาเน็ตเวิร์ก)
            console.error('Error: Network issue. Could not connect to TMDB API.');
        } else {
            // Error อื่นๆ ที่เกิดขึ้นตอนตั้งค่า request
            console.error('An unexpected error occurred:', error.message);
        }
    }
}

// 7. Run Function

fetchMovies();