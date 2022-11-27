import JobList from './JobList';
import { getJobs } from '../graphql/queries.js'
import { useEffect, useState } from 'react';

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getJobs().then((jobs) => setJobs(jobs)).catch(() => setError(true));
  }, [])

  if(error) {
    return <p>Sorry! Something went wrong.</p>
  }

  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
