const rawgApiKey = import.meta.env.VITE_RAWG_API_KEY

export async function getUpcomingGames(pageNumber = 1) {
    let currentDate = new Date().toISOString().split('T')[0];
    let lastDayOfYear = new Date(new Date().getFullYear(), 11, 32).toISOString().split("T")[0]
    const response = await fetch("/rawg/games?key=" + rawgApiKey + "&dates=" + currentDate + "," + lastDayOfYear + "&ordering=-added&page=" + pageNumber + "&page_size=9")
    let responseJson = await response.json()
    return {total: responseJson.count, results: responseJson.results, nextPage: pageNumber + 1}
}