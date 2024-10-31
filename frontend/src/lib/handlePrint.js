export function handlePrint(ipData) {
    if (!ipData) {
        console.error("ipData is null or undefined");
        return;
    }

    // Flatten ipData for display, handling nested location fields
    const flattenedData = {
        "IP Address": ipData.ip,
        "Country": ipData.location.country,
        "Region": ipData.location.region,
        "City": ipData.location.city,
        "Latitude": ipData.location.lat,
        "Longitude": ipData.location.lng,
        "Timezone": ipData.location.timezone,
        "ISP": ipData.isp,
        "AS": ipData.as,
        "Proxy": ipData.proxy ? "Yes" : "No",
        "Hosting": ipData.hosting ? "Yes" : "No",
    };

    // Generate table rows
    const tableRows = Object.entries(flattenedData).map(([key, value]) => (
        `<tr>
            <td class="field">${key}</td>
            <td class="value">${value}</td>
        </tr>`
    )).join('');

    // Create a new window and write the table HTML
    const printWindow = window.open('', 'Print IP Data');
    printWindow.document.write(`
      <html>
      <head>
        <title>IP Data</title>
        <style>
            /* General styles */
            body {
                font-family: Arial, sans-serif;
                color: #333;
                padding: 20px;
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: #f8f9fa;
            }
            h1 {
                color: #007bff;
                text-align: center;
                font-size: 1.8em;
                margin-bottom: 20px;
            }
            table {
                width: 100%;
                max-width: 600px;
                border-collapse: collapse;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                margin: auto;
                background-color: white;
                border-radius: 8px;
                overflow: hidden;
            }
            th, td {
                padding: 12px 15px;
                text-align: left;
                font-size: 1em;
            }
            .field {
                background-color: #f2f2f2;
                font-weight: 500;
            }
            .value {
                color: #555;
                font-weight: 400;
            }
            /* Responsive styles */
            @media (max-width: 600px) {
                h1 {
                    font-size: 1.5em;
                }
                table {
                    width: 90%;
                }
                th, td {
                    padding: 10px;
                }
            }
        </style>
      </head>
      <body>
        <h1>IP Data Details</h1>
        <table>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
}
