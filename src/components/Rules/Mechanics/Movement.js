import React from "react";
import { Container, ListGroup, Table } from "react-bootstrap";

const textStyle = { textAlign: "left" };

export const Movement = () => {
  return (
    <Container>
      <h3>Movement</h3>
      <div style={textStyle}>
        <ListGroup>
          <ListGroup.Item>
            <p>
              Swimming across a rushing river, sneaking down a dungeon corridor,
              scaling a treacherous Mountain slope—all sorts of Movement play a
              key role in fantasy gaming Adventures. The GM can summarize the
              adventurers’ Movement without calculating exact distances or
              Travel times: “You Travel through the Forest and find the dungeon
              entrance late in the evening of the third day.” Even in a dungeon,
              particularly a large dungeon or a cave network, the GM can
              summarize Movement between encounters: “After killing the Guardian
              at the entrance to the ancient dwarven stronghold, you consult
              your map, which leads you through miles of echoing corridors to a
              chasm bridged by a narrow stone arch.” Sometimes it’s important,
              though, to know how long it takes to get from one spot to another,
              whether the answer is in days, hours, or minutes. The rules for
              determining Travel time depend on two factors: the speed and
              Travel pace of the Creatures moving and the terrain they’re moving
              over.
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>Speed</h5>
            <p>
              Every character and monster has a speed, which is the distance in
              feet that the character or monster can walk in 1 round. This
              number assumes short bursts of energetic Movement in the midst of
              a life- threatening situation. The following rules determine how
              far a character or monster can move in a minute, an hour, or a
              day.
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>Travel Pace</h5>
            <p>
              While traveling, a group of Adventurers can move at a normal,
              fast, or slow pace, as shown on the Travel Pace table. The table
              states how far the party can move in a period of time and whether
              the pace has any Effect. A fast pace makes Characters less
              perceptive, while a slow pace makes it possible to sneak around
              and to Search an area more carefully.
            </p>
            <h5>Forced March</h5>
            <p>
              The Travel Pace table assumes that Characters Travel for 8 hours
              in day. They can push on beyond that limit, at the risk of
              Exhaustion. For each additional hour of Travel beyond 8 hours, the
              Characters cover the distance shown in the Hour column for their
              pace, and each character must make a Constitution saving throw at
              the end of the hour. The DC is 10 + 1 for each hour past 8 hours.
              On a failed saving throw, a character suffers one level of
              Exhaustion (see Conditions ).
            </p>
            <h5>Mounts and Vehicles</h5>
            <p>
              For short spans of time (up to an hour), many animals move much
              faster than Humanoids. A mounted character can ride at a gallop
              for about an hour, covering twice the usual distance for a fast
              pace. If fresh Mounts are available every 8 to 10 miles,
              Characters can cover larger distances at this pace, but this is
              very rare except in densely populated areas.
            </p>
            <p>
              Characters in wagons, carriages, or other Land Vehicles choose a
              pace as normal. Characters in a waterborne vessel are limited to
              the speed of the vessel, and they don’t suffer penalties for a
              fast pace or gain benefits from a slow pace. Depending on the
              vessel and the size of the crew, ships might be able to Travel for
              up to 24 hours per day.
            </p>
            <p>
              Certain Special Mounts, such as a Pegasus or Griffon, or Special
              vehicles, such as a Carpet of Flying, allow you to Travel more
              swiftly.
            </p>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Pace</th>
                  <th>Minute</th>
                  <th>Hour</th>
                  <th>Day</th>
                  <th>Effect</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Fast</td>
                  <td>400 feet</td>
                  <td>4 miles</td>
                  <td>30 miles</td>
                  <td>−5 penalty to passive Wisdom (Perception) scores</td>
                </tr>
                <tr>
                  <td>Normal</td>
                  <td>300 feet</td>
                  <td>3 miles</td>
                  <td>24 miles</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Slow</td>
                  <td>200 feet</td>
                  <td>2 miles</td>
                  <td>18 miles</td>
                  <td>Able to use Stealth</td>
                </tr>
              </tbody>
            </Table>
            <h5>Difficult Terrain</h5>
            <p>
              The Travel speeds given in the Travel Pace table assume relatively
              simple terrain: roads, open plains, or clear dungeon corridors.
              But Adventurers often face dense forests, deep swamps,
              rubble-filled ruins, steep mountains, and ice-covered ground—all
              considered Difficult Terrain.
            </p>
            <p>
              You move at half speed in difficult terrain— moving 1 foot in
              Difficult Terrain costs 2 feet of speed—so you can cover only half
              the normal distance in a minute, an hour, or a day.
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>Special Types of Movement</h5>
            <p>
              Movement through dangerous Dungeons or Wilderness areas often
              involves more than simply walking. Adventurers might have to
              climb, crawl, swim, or jump to get where they need to go.
            </p>
            <h5>Climbing, Swimming, and Crawling</h5>
            <p>
              While climbing or Swimming, each foot of Movement costs 1 extra
              foot (2 extra feet in difficult terrain), unless a creature has a
              climbing or Swimming speed. At the GM’s option, climbing a
              slippery vertical surface or one with few handholds requires a
              successful Strength (Athletics) check. Similarly, gaining any
              distance in rough water might require a successful Strength
              (Athletics) check.
            </p>
            <h5>Jumping</h5>
            <p>Your Strength determines how far you can jump.</p>
            <p>
              <b>Long Jump</b> When you make a Long Jump, you cover a number of
              feet up to your Strength score if you move at least 10 feet on
              foot immediately before the jump. When you make a standing Long
              Jump, you can leap only half that distance. Either way, each foot
              you clear on the jump costs a foot of Movement.
            </p>
            <p>
              This rule assumes that the height of your jump doesn’t matter,
              such as a jump across a stream or chasm. At your GM’s option, you
              must succeed on a DC 10 Strength (Athletics) check to clear a low
              obstacle (no taller than a quarter of the jump’s distance), such
              as a hedge or low wall. Otherwise, you hit it.
            </p>
            <p>
              When you land in Difficult Terrain, you must succeed on a DC 10
              Dexterity (Acrobatics) check to land on your feet. Otherwise, you
              land prone.
            </p>
            <p>
              <b>High Jump</b> When you make a High Jump, you leap into the air
              a number of feet equal to 3 + your Strength modifier if you move
              at least 10 feet on foot immediately before the jump. When you
              make a standing High Jump, you can jump only half that distance.
              Either way, each foot you clear on the jump costs a foot of
              Movement. In some circumstances, your GM might allow you to make a
              Strength (Athletics) check to jump higher than you normally can.
            </p>
            <p>
              You can extend your arms half your height above yourself during
              the jump. Thus, you can reach above you a distance equal to the
              height of the jump plus 1½ times your height.
            </p>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </Container>
  );
};

export default Movement;
