import {
  IonAvatar,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { football } from 'ionicons/icons';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { players, skippedPlayers } from '../business/data';
// import './Page.css';

const Players: React.FC = () => {
  const history = useHistory();

  const makeTeams = useCallback(() => {
    history.push('/teams');
  }, [history]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Players</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Players</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {players.map((player) => (
            <IonItem key={player.id}>
              <IonAvatar slot="start">
                <img alt={player.name} src={player.img} />
              </IonAvatar>
              <IonCheckbox
                justify="start"
                labelPlacement="end"
                checked={!player.skip}
                onIonChange={(ev) => {
                  player.skip = !ev.target.checked;
                  skippedPlayers[player.id] = player.skip;
                  localStorage.setItem('selected-players', JSON.stringify(skippedPlayers));
                }}
              >
                {player.name}
              </IonCheckbox>
            </IonItem>
          ))}
        </IonList>
        <IonFab slot="fixed" vertical="bottom" horizontal="end" onClick={makeTeams}>
          <IonFabButton>
            <IonIcon icon={football}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Players;
