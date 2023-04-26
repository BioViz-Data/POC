import React, { useState } from 'react';
import FileUpload from './Components/FileUpload';
import ChartSelection from './Components/ChartSelection';
import ChartDisplay from './Components/ChartDisplay';
import SupersetClient from './Components/SupersetClient';

const App = () => {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const chartTypes = [
    'Line Chart',
    'Bar Chart',
    'Pie Chart',
    // Add more chart types
  ];

  const supersetClient = new SupersetClient('https://superset.levacc.org');

const handleLogin = async (e) => {
  e.preventDefault();
  const success = await supersetClient.login(username, password);
  if (success) {
    alert('Login successful');
    setLoggedIn(true);
  } else {
    alert('Login failed');
    alert('Login failed. Please check your credentials.');
  }
};

  return (
    <div className="App">
      <h1>Visualizador de CSV usando Superset</h1>
      {!loggedIn ? (
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      ) : (
        <>
          <FileUpload setData={setData} />
          <ChartSelection chartTypes={chartTypes} setChartType={setChartType} />
          <ChartDisplay data={data} chartType={chartType} supersetClient={supersetClient} />
        </>
      )}
    </div>
  );
};
export default App;
