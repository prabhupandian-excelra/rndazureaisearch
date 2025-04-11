export const downloadJson = (data, fileName) => {
    const prettyJson = JSON.stringify(data, null, 2); // Pretty-print with 2 spaces
    const blob = new Blob([prettyJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.json`;
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
};