import React, { MutableRefObject, useEffect } from "react";
import { Image, View } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCardBackAsset, getPlayingCardAsset } from "../../../assets/cards";
import Player from "../../classes/Player";
import {
  calculateResults,
  cycleActivePlayer,
  hit,
  initialiseGame,
  stand,
} from "../../state/game/gameSlice";
import { RootState } from "../../state/store";
import Background from "../components/Background";
import Button from "../components/Button";
import PlayerHand from "../components/PlayerHand";
import ScreenTitle from "../components/ScreenTitle";

interface Props {
  navigation: any;
}

const DELAY = 2000;

const getAllPlayersFinished = (players: Player[]) => {
  return players.every(
    (player) => player.getIsBust() || player.getIsStanding()
  );
};

const delay = (
  callback: () => any,
  duration: number,
  shouldSkipRef: MutableRefObject<boolean>
) => {
  if (!shouldSkipRef.current) {
    shouldSkipRef.current = true;
    setTimeout(() => {
      shouldSkipRef.current = false;
      callback();
    }, duration);
  }
};

export default function Game({ navigation }: Props) {
  const waitingRef = React.useRef(false);

  const dispatch = useDispatch();
  const players = useSelector((state: RootState) => state.game.players);
  const dealer = players.find(
    (player: Player) => player.id === "dealer"
  ) as Player;
  const activePlayer = players[0];
  const gameIsFinished =
    useSelector((state: RootState) => state.game.results).length !== 0;

  const allFinished = getAllPlayersFinished(players);

  const buttonsDisabled =
    activePlayer.getIsBust() ||
    activePlayer.getIsStanding() ||
    activePlayer.id === dealer.id;

  useEffect(() => {
    if (!gameIsFinished) {
      if (activePlayer.getIsBust() || activePlayer.getIsStanding()) {
        delay(
          () => {
            dispatch(cycleActivePlayer());
          },
          0,
          waitingRef
        );
      } else if (activePlayer.id === dealer.id) {
        dispatch(hit(activePlayer.id));
        delay(
          () => {
            dispatch(cycleActivePlayer());
          },
          DELAY,
          waitingRef
        );
      }
    }
  }, [
    activePlayer.id,
    activePlayer.getIsBust(),
    activePlayer.getIsStanding(),
    gameIsFinished,
  ]);

  useEffect(() => {
    if (allFinished) {
      waitingRef.current = false;
      delay(
        () => {
          dispatch(calculateResults());
          navigation.navigate("Winners");
        },
        DELAY,
        waitingRef
      );
    }
  }, [allFinished]);

  return (
    <Background>
      {/* <ScreenTitle>dealer</ScreenTitle> */}
      {/* <View style={{ flexDirection: "row", marginTop: 32, marginBottom: 42 }}> */}
      {/* <Image
          source={getCardBackAsset()}
          style={{
            height: 121,
            width: 83,
            marginRight: 16,
            resizeMode: "contain",
          }}
        />
        <Image
          source={getPlayingCardAsset(dealer.hand[1].suit, dealer.hand[1].rank)}
          style={{
            height: 121,
            width: 83,
            resizeMode: "contain",
          }}
        /> */}
      <PlayerHand
        key={dealer.id}
        name={dealer.name + " - " + dealer.getValue()}
        cards={dealer.hand}
        bust={dealer.getIsBust()}
        standing={dealer.getIsStanding()}
      />
      {/* </View> */}
      <View style={{ opacity: activePlayer.id !== dealer.id ? 1 : 0 }}>
        <PlayerHand
          key={activePlayer.id + "-active"}
          name={activePlayer.name + " - " + activePlayer.getValue()}
          cards={activePlayer.hand}
          bust={activePlayer.getIsBust()}
          standing={activePlayer.getIsStanding()}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginHorizontal: 16,
          width: "100%",
          marginBottom: 64,
        }}
      >
        {players.map(
          (player: Player) =>
            player.id !== dealer.id &&
            player.id !== activePlayer.id && (
              <PlayerHand
                key={player.id}
                name={player.name + " - " + player.getValue()}
                tiny
                cards={player.hand}
                bust={player.getIsBust()}
                standing={player.getIsStanding()}
              />
            )
        )}
      </View>
      <Button
        title="hit"
        onPress={() => {
          dispatch(hit(activePlayer.id));
          delay(
            () => {
              dispatch(cycleActivePlayer());
            },
            DELAY,
            waitingRef
          );
        }}
        gold
        disabled={buttonsDisabled}
      />
      <Button
        title="stand"
        onPress={() => {
          dispatch(stand(activePlayer.id));
          delay(
            () => {
              dispatch(cycleActivePlayer());
            },
            DELAY,
            waitingRef
          );
        }}
        gold
        disabled={buttonsDisabled}
      />
    </Background>
  );
}
