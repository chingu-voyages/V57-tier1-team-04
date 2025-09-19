export const downloadJSON = (data, filename = 'data') => {
    if (!data) {
        alert("No data to download!");
        return; 
    }

    const dataString = JSON. stringify(data, null, 2);
    const blob = new Blob ([dataString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};