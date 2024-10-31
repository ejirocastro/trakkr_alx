import React, { useState, useEffect, useRef, useContext } from 'react';
import { MapPin, Download, Copy, Printer, Lock, AlertTriangle, Search, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import useGetProfile from "../hooks/useFetchData";
import { API_KEY, BASE_URL } from '../config';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { toast } from 'react-toastify';

import
{
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { authContext } from '../context/AuthContext';
import { saveAs } from 'file-saver';

const ActionButton = ({ icon, label, onClick, isLoggedIn }) => (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onClick}
                    className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                >
                    {!isLoggedIn && <Lock className="h-4 w-4 mr-1" />}
                    {icon}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{isLoggedIn ? label : 'Login required'}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
);

const IpTrackerDashboard = ({ isLoggedIn = false }) =>
{
    const { user } = useContext(authContext);
    const { data: userData } = useGetProfile(
        user ? `${BASE_URL}/users/me` : null
    );

    if (user) isLoggedIn = true;

    const [ipAddress, setIpAddress] = useState('');
    const [ipData, setIpData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showAuthAlert, setShowAuthAlert] = useState(false);
    const mapRef = useRef(null);
    const leafletMap = useRef(null);

    useEffect(() =>
    {
        return () =>
        {
            if (leafletMap.current)
            {
                leafletMap.current.remove();
                leafletMap.current = null;
            }
        };
    }, []);

    useEffect(() =>
    {
        if (ipData && mapRef.current)
        {
            if (!ipData || !mapRef.current) return;

            if (leafletMap.current)
            {
                leafletMap.current.remove();
                leafletMap.current = null;
            }

            const container = mapRef.current;
            container.innerHTML = '';

            leafletMap.current = L.map(mapRef.current).setView(
                [ipData.location.lat, ipData.location.lng],
                13
            );

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(leafletMap.current);

            const customIcon = L.divIcon({
                className: 'custom-marker',
                html: `<div class="w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
              <div class="w-2 h-2 bg-white rounded-full"></div>
            </div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            });

            L.marker([ipData.location.lat, ipData.location.lng], { icon: customIcon })
                .addTo(leafletMap.current);
        }

        return () =>
        {
            if (leafletMap.current)
            {
                leafletMap.current.remove();
                leafletMap.current = null;
            }
        };
    }, [ipData]);

    const fetchIpData = async (ip) =>
    {
        setLoading(true);
        setError('');

        try
        {
            const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}`);
            const data = await response.json();

            setIpData({
                ip: data.ip,
                location: {
                    country: data.location.country,
                    region: data.location.region,
                    city: data.location.city,
                    lat: data.location.lat,
                    lng: data.location.lng,
                    timezone: data.location.timezone
                },
                isp: data.isp,
                as: data.as ? `${data.as.asn} ${data.as.name || ''}`.trim() : 'N/A',
                proxy: false,
                hosting: false
            });
        } catch (err)
        {
            setError('Failed to fetch IP data. Please try again.');
            toast.error("Invalid Ip  address! Please provide valid IP")
        } finally
        {
            setLoading(false);
        }
    };

    const handleActionWithAuth = (action, actionName) =>
    {
        if (!isLoggedIn)
        {
            setShowAuthAlert(true);
            setTimeout(() => setShowAuthAlert(false), 3000);
            return;
        }
        if (ipData)
        {  // Ensure ipData is not null
            action(ipData);
        } else
        {
            console.warn("ipData is not available yet");
        }
    };


    function handlePrint(ipData)
    {
        if (!ipData)
        {
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
                    padding: 5px;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
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
                    background-color: white;
                    border-radius: 8px;
                    overflow: hidden;
                }
                    th {
                        background-color: blue;
                        color: white;
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


    // Function to generate a PDF download of the IP data
    function handleDownload(ipData)
    {
        if (!ipData || typeof ipData !== 'object')
        {
            console.error("ipData is undefined or null");
            return;
        }

        // Flatten the ipData object for easier display in the table
        const tableData = [
            ['IP', ipData.ip],
            ['Country', ipData.location.country],
            ['Region', ipData.location.region],
            ['City', ipData.location.city],
            ['Latitude', ipData.location.lat],
            ['Longitude', ipData.location.lng],
            ['Timezone', ipData.location.timezone],
            ['ISP', ipData.isp],
            ['AS', ipData.as],
            ['Proxy', ipData.proxy ? 'Yes' : 'No'],
            ['Hosting', ipData.hosting ? 'Yes' : 'No'],
        ];

        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Add the table to the PDF
        doc.autoTable({
            head: [['Field', 'Value']],
            body: tableData,
        });

        // Set the PDF file name
        doc.save(`ip-data-${ipData.ip}.pdf`);
    }


    // Function to generate a CSV download of the IP data
    function handleDownloadCSV(ipData)
    {
        // Generate a table with the IP data
        const tableData = Object.entries(ipData).map(([key, value]) => [key, value]);
        const tableRows = tableData.map(([key, value]) => `${key},${value}`).join('\n');

        // Create a CSV file and download it
        const csvContent = 'Field,Value\n' + tableRows;
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, `ip-data-${ipData.ip}.csv`);
    }

    const InfoField = ({ label, value }) => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border-b border-slate-700/50 pb-3"
        >
            <h3 className="text-sm font-medium text-slate-400">{label}</h3>
            <p className="mt-1 text-lg font-semibold text-white">{value}</p>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-blue-900 p-4 md:p-6 lg:p-8">
            <motion.div
                className="max-w-7xl mx-auto space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.h1
                        className="text-4xl font-bold text-white mb-2"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Track<span className="text-blue-400">It</span>
                    </motion.h1>
                    <motion.p
                        className="text-slate-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Professional IP tracking and analysis
                    </motion.p>
                </div>

                {/* Search Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Card className="bg-white/10 backdrop-blur-lg border-slate-700">
                        <CardContent className="pt-6">
                            <form onSubmit={(e) =>
                            {
                                e.preventDefault();
                                fetchIpData(ipAddress);
                            }} className="flex gap-4">
                                <Input
                                    type="text"
                                    placeholder="Enter IP address..."
                                    value={ipAddress}
                                    onChange={(e) => setIpAddress(e.target.value)}
                                    className="flex-1 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                                />
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Tracking...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Search className="w-4 h-4" />
                                            Track IP
                                        </div>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Auth Alert */}
                <AnimatePresence>
                    {showAuthAlert && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="fixed top-4 right-[45%] z-50"
                        >
                            <Alert className="bg-gray-100 border-blue-700 text-lg text-blue-700">
                                <Info className="h-4 w-4" />
                                <AlertDescription>
                                    Please log in to access this feature
                                </AlertDescription>
                            </Alert>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Results Section */}
                <AnimatePresence>
                    {ipData && (
                        <motion.div
                            className="grid gap-6 md:grid-cols-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {/* Info Card */}
                            <Card className="bg-white/10 backdrop-blur-lg border-slate-700">
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-center text-white">
                                        IP Information
                                        <div className="flex gap-2">
                                            <ActionButton
                                                icon={<Copy className="h-4 w-4" />}
                                                label="Copy data"
                                                isLoggedIn={isLoggedIn}
                                                onClick={() => handleActionWithAuth(() =>
                                                {
                                                    navigator.clipboard.writeText(JSON.stringify(ipData, null, 2));
                                                }, 'copy')}
                                            />
                                            <ActionButton
                                                icon={<Printer className="h-4 w-4" />}
                                                label="Print data"
                                                isLoggedIn={isLoggedIn}
                                                onClick={() => handleActionWithAuth(handlePrint, 'print')}
                                            />
                                            <ActionButton
                                                icon={<Download className="h-4 w-4" />}
                                                label="Download data"
                                                isLoggedIn={isLoggedIn}
                                                onClick={() => handleActionWithAuth(handleDownload, 'download')}
                                            />
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <InfoField label="IP Address" value={ipData.ip} />
                                        <InfoField
                                            label="Location"
                                            value={`${ipData.location.city}, ${ipData.location.region}, ${ipData.location.country}`}
                                        />
                                        <InfoField label="Timezone" value={ipData.location.timezone} />
                                        <InfoField label="ISP" value={ipData.isp} />
                                        <InfoField label="AS Number" value={ipData.as} />

                                        <div className="pt-4 flex gap-4">
                                            <div className="flex items-center gap-2 text-sm text-slate-300">
                                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                                <span>Clean IP</span>
                                            </div>
                                            {ipData.proxy && (
                                                <div className="flex items-center gap-2 text-sm text-slate-300">
                                                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                                    <span>Proxy Detected</span>
                                                </div>
                                            )}
                                            {ipData.hosting && (
                                                <div className="flex items-center gap-2 text-sm text-slate-300">
                                                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                                    <span>Hosting</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Map Card */}
                            <Card className="bg-white/10 backdrop-blur-lg border-slate-700">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-white">
                                        <MapPin className="h-5 w-5" />
                                        Location Map
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div
                                        ref={mapRef}
                                        className="h-96 rounded-lg overflow-hidden shadow-xl"
                                        style={{ width: '100%' }}
                                    />
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default IpTrackerDashboard;