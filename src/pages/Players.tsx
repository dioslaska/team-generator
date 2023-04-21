import {
  IonAvatar,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { football, reload } from 'ionicons/icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IPlayer, players, skills, skippedPlayers } from '../business/data';
import { createTeams, IResult } from '../business/teams';

import './Players.css';

const Players: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | null>(null);
  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

  const [result, setResult] = useState<IResult>({
    team1: [],
    team2: [],
    scores1: { total: 0 },
    scores2: { total: 0 },
    deltas: { total: 0 },
  });

  const page = useRef(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  const makeTeams = useCallback(() => {
    setResult(createTeams());
    setIsOpen(true);
  }, []);

  const openProfile = useCallback((player: IPlayer) => {
    setSelectedPlayer(player);
    setIsProfileOpen(true);
  }, []);

  return (
    <IonPage ref={page}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Players</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Players</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        <IonList>
          {players.map((player, i) => (
            <IonItem key={player.id} lines={i === players.length - 1 ? 'full' : 'inset'}>
              <IonAvatar slot="start" onClick={() => openProfile(player)}>
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

        <IonButton expand="block" onClick={makeTeams}>
          <IonIcon slot="start" icon={football}></IonIcon>Make teams
        </IonButton>

        <IonModal isOpen={isProfileOpen} onWillDismiss={() => setIsProfileOpen(false)} presentingElement={presentingElement!}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{selectedPlayer ? selectedPlayer.name : ''}</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsProfileOpen(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {skills.map((skill) => (
              <IonItem key={skill.name}>
                <IonBadge slot="end">{selectedPlayer ? (selectedPlayer as any)[skill.name] : 0}</IonBadge>
                <IonLabel>{skill.display}</IonLabel>
              </IonItem>
            ))}
          </IonContent>
        </IonModal>

        <IonModal isOpen={isOpen} onWillDismiss={() => setIsOpen(false)} presentingElement={presentingElement!}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Teams</IonTitle>
              <IonButtons slot="start">
                <IonButton onClick={makeTeams}>
                  <IonIcon slot="start" icon={reload}></IonIcon>
                </IonButton>
              </IonButtons>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
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
                      {skill.display}: {(result.scores1[skill.name] || 0).toFixed(2)}
                      {delta ? <span className={delta < 0 ? 'delta-minus' : 'delta-plus'}> ({delta.toFixed(2)}%)</span> : null}
                    </div>
                  );
                })}

                <IonList>
                  {result.team1.map((player, i) => (
                    <IonItem key={player.id} lines={i === result.team1.length - 1 ? 'none' : 'inset'}>
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
                    <span className={result.deltas.total > 0 ? 'delta-minus' : 'delta-plus'}>
                      {' '}
                      ({(result.deltas.total * -1).toFixed(2)}%)
                    </span>
                  ) : null}
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <br />
                {skills.map((skill) => {
                  const delta = (result.deltas[skill.name] || 0) * -1;
                  return (
                    <div key={skill.name}>
                      {skill.display}: {(result.scores2[skill.name] || 0).toFixed(2)}
                      {delta ? <span className={delta < 0 ? 'delta-minus' : 'delta-plus'}> ({delta.toFixed(2)}%)</span> : null}
                    </div>
                  );
                })}

                <IonList>
                  {result.team2.map((player, i) => (
                    <IonItem key={player.id} lines={i === result.team2.length - 1 ? 'none' : 'inset'}>
                      <IonAvatar slot="start">
                        <img alt={player.name} src={player.img} />
                      </IonAvatar>
                      <IonLabel>{player.name}</IonLabel>
                    </IonItem>
                  ))}
                </IonList>
              </IonCardContent>
            </IonCard>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Players;
