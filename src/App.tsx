import './App.css';
import BirthdayMatrix from './components/BirthdayMatrix';
import BirthdayImage from './components/BirthdayImage'
import BirthdayIntro from './components/BirthdayIntro';
import BirthdayCheckInbox from './components/BirthdayCheckInbox';
import BirthdayCongratulation from './components/BirthdayCongratulation';

function App() {
  return (
    <div className="App">
      <div className="console">
        <BirthdayIntro className="birthday-text"/>
        <BirthdayImage className="birthday-image"/>
        <BirthdayCheckInbox className="birthday-text"/>
        <BirthdayCongratulation className="birthday-text"/>
      </div>
      <BirthdayMatrix className="birthday-background"/>
    </div>
  );
}

export default App;
