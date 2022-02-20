import { Box, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ApiService } from '../../Services';

export const Main = () => {
  const [time, setTime] = useState(undefined);
  const [multiplicator, setMultiplicator] = useState(undefined);
  const api = useMemo(() => new ApiService(), []);

  const fetchTime = useCallback(() => {
    api.getTime().then((data) => {
      setTime(data.time);
      setMultiplicator(data.multiplicator);
    });
  }, []);

  useEffect(() => {
    fetchTime();
    const interval = setInterval(() => fetchTime(), 500);
    return () => {
      clearInterval(interval);
    };
  }, [fetchTime]);

  return (
    <Box sx={{ maxWidth: '70%', margin: '100px auto' }}>
      {!!time && (
        <Typography variant="h4" align="center" paddingBottom={'20px'}>
          Date:{' '}
          {new Date(time).toLocaleDateString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Typography>
      )}
      {!!multiplicator && (
        <Typography variant="h4" align="center" paddingBottom={'20px'}>
          Multiplicator: 1 real second = {multiplicator} virtual minute
        </Typography>
      )}
    </Box>
  );
};
