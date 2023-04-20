import {
  IonAvatar,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
  useIonViewWillEnter,
} from '@ionic/react';
import { useCallback, useState } from 'react';
import { reload } from 'ionicons/icons';
import { skills } from '../business/data';
import { createTeams, IResult } from '../business/teams';
import './Teams.css';

const Teams: React.FC = () => {
  const [present] = useIonToast();
  const [result, setResult] = useState<IResult>({
    team1: [],
    team2: [],
    scores1: { total: 0 },
    scores2: { total: 0 },
    deltas: { total: 0 },
  });

  const remakeTeams = useCallback(() => {
    setResult(createTeams());
    present({
      message: 'Teams regenerated',
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
  }, [present]);

  useIonViewWillEnter(() => {
    setResult(createTeams());
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Teams</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Teams</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <IonCardHeader color="primary">
            <IonCardTitle>
              Team 1: {result.scores1.total.toFixed(2)}
              {result.deltas.total ? (
                <span className={result.deltas.total < 0 ? 'delta-minus' : 'delta-plus'}> ({result.deltas.total.toFixed(2)}%)</span>
              ) : null}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <br />
            {skills.map((skill) => {
              const delta = result.deltas[skill.name] || 0;
              return (
                <div key={skill.name}>
                  {skill.name}: {(result.scores1[skill.name] || 0).toFixed(2)}
                  {delta ? <span className={delta < 0 ? 'delta-minus' : 'delta-plus'}> ({delta.toFixed(2)}%)</span> : null}
                </div>
              );
            })}

            <IonList>
              {result.team1.map((player) => (
                <IonItem key={player.id}>
                  <IonAvatar slot="start">
                    <img alt={player.name} src={player.img} />
                  </IonAvatar>
                  <IonLabel>{player.name}</IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader color="primary">
            <IonCardTitle>
              Team 2: {result.scores2.total.toFixed(2)}
              {result.deltas.total ? (
                <span className={result.deltas.total > 0 ? 'delta-minus' : 'delta-plus'}> ({(result.deltas.total * -1).toFixed(2)}%)</span>
              ) : null}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <br />
            {skills.map((skill) => {
              const delta = (result.deltas[skill.name] || 0) * -1;
              return (
                <div key={skill.name}>
                  {skill.name}: {(result.scores2[skill.name] || 0).toFixed(2)}
                  {delta ? <span className={delta < 0 ? 'delta-minus' : 'delta-plus'}> ({delta.toFixed(2)}%)</span> : null}
                </div>
              );
            })}

            <IonList>
              {result.team2.map((player) => (
                <IonItem key={player.id}>
                  <IonAvatar slot="start">
                    <img alt={player.name} src={player.img} />
                  </IonAvatar>
                  <IonLabel>{player.name}</IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>

        <IonFab slot="fixed" vertical="bottom" horizontal="end" onClick={remakeTeams}>
          <IonFabButton>
            <IonIcon icon={reload}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Teams;
