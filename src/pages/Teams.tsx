import {
  IonAvatar,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { IPlayer, playerMap, skills } from '../business/data';
import { deltaPercent } from '../business/util';
import './Teams.css';

const t1 = ['Csaba', 'Béla', 'Isti', 'Kinda', 'Róka'];
const t2 = ['Atesz', 'Fazi', 'Csegzi', 'Huni', 'Robi'];

const team1: IPlayer[] = t1.map((p) => playerMap[p]);
const team2: IPlayer[] = t2.map((p) => playerMap[p]);

const teamLength = team1.length;

const scores1: { [key: string]: number } = { total: 0 };
const scores2: { [key: string]: number } = { total: 0 };
const deltas: { [key: string]: number } = { total: 0 };
let totalScore1 = 0;
let totalScore2 = 0;
let weightedNr = 0;

for (const player of team1) {
  for (const skill of skills) {
    scores1[skill.name] = (scores1[skill.name] || 0) + (player as any)[skill.name];
    totalScore1 += (player as any)[skill.name] * skill.weight;
  }
}

for (const player of team2) {
  for (const skill of skills) {
    scores2[skill.name] = (scores2[skill.name] || 0) + (player as any)[skill.name];
    totalScore2 += (player as any)[skill.name] * skill.weight;
  }
}

for (const skill of skills) {
  const delta = deltaPercent(scores1[skill.name], scores2[skill.name]);
  deltas[skill.name] = delta;
  // Calculate average score
  scores1[skill.name] = scores1[skill.name] / teamLength;
  scores2[skill.name] = scores2[skill.name] / teamLength;
  scores1.total += scores1[skill.name] * skill.weight;
  scores2.total += scores2[skill.name] * skill.weight;
  weightedNr += skill.weight;
}

scores1.total = scores1.total / weightedNr;
scores2.total = scores2.total / weightedNr;

deltas.total = deltaPercent(totalScore1, totalScore2);

const result = { team1, team2, scores1, scores2, deltas };

const Teams: React.FC = () => {
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
    </IonPage>
  );
};

export default Teams;
