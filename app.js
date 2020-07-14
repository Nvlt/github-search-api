let appStorage = {};
function apiRequest(qUrl)
{
    //Request completed query url and send to response handler
    fetch(qUrl).then(resp => resp.json()).then(jsonResp => responseHandler(jsonResp)).catch(error => errorHandler(error));
}
function responseHandler(jsonResponse)
{
    //Recieve parsed json response
    
    appStorage = jsonResponse;
    render();
}
function errorHandler(error)
{
    throw error;
}
function render()
{
    $("main").html(constructResults(appStorage));
}
function constructResults(results)
{
    console.log(results);
    let html = ""
    results.forEach(element => {

        html += `<div class="entry">
        <p>Repo ID: ${element.id}</p>
        <p>Project Name: ${element.name}</p>
        <p>Date: ${element.created_at}</p>
        <a href="${element.html_url}">${element.html_url}</a>
    </div>`
    });
    return html;
}
function constructUrl()
{   
    let baseUrl = "https://api.github.com/users/";
    let inputStr = $("#search-form #search").val();
    return `${baseUrl}${encodeURI(inputStr)}/repos`;
}
function initForm()
{
    $("#search-form").on("submit", function(e){
       e.preventDefault();
        apiRequest(constructUrl());

    });
}

function main()
{
    initForm();
}
$(main)