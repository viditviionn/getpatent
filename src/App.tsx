import { Stack, Paper } from '@mui/material';
import { backgroundColor, leftPnaleColor, rightPanelColor } from './assets/colors';
import { LeftPanel } from './components/left-panel';
import { RightPanel } from './components/right-panel';
import PatentChart from './components/PatentChart';
import CategoryChart from './components/CategoryChart';

function App() {

  return (
    <Stack direction='row' width={'100vw'} height='100vh' style={{ maxHeight: '100%', background: backgroundColor}} >
      <Stack style={{ width:'30%', height: '100vh', border: 'none', background: leftPnaleColor  }}>
        <LeftPanel />
      </Stack>
      <Stack style={{ width:'70%',height: '100%', justifyContent: 'center', alignItems: 'center', background: rightPanelColor  }}>
      <RightPanel />
      
      </Stack>
    </Stack>
  );
}

export default App;
