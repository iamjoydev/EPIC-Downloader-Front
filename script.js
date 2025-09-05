const historyList = document.getElementById("history");

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

async function download() {
    const url = document.getElementById("url").value;
    const format = document.getElementById("format").value;
    const status = document.getElementById("status");

    if (!url) return status.innerText = "Please enter a URL";

    let apiUrl = "";
    if (url.includes("youtube.com") || url.includes("youtu.be")) apiUrl = `/download/youtube?url=${url}&format=${format}`;
    else if (url.includes("facebook.com")) apiUrl = `/download/facebook?url=${url}`;
    else if (url.includes("instagram.com")) apiUrl = `/download/instagram?url=${url}`;
    else return status.innerText = "Invalid URL";

    status.innerText = "Downloading...";
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Download failed");

        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "download";
        document.body.appendChild(link);
        link.click();
        link.remove();
        status.innerText = "Download started!";

        // Save history
        const li = document.createElement("li");
        li.innerText = `${url} (${format})`;
        historyList.appendChild(li);

    } catch (err) {
        status.innerText = err.message;
    }
}
