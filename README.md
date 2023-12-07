# 재밌는 게임 🎮

#### 프로젝트 이름
짱구를 찾아라

#### 사용 언어
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=javascript&logoColor=black">

#### 구현 사항
* 게임시작 버튼을 누르면 게임시작
* 남은 시간과 현재 점수 표시
* 가방 짱구를 클릭하면 짱구는 사라지고 앞으로 더 찾아야 할 짱구의 수 점수판에 표시
* 가방 짱구가 아닌 다른 캐릭터를 클릭하면 그 캐릭터는 사라지고 하트가 하나씩 줄어듬
* 하트 5개를 다 써버리면 게임 종료
* REPLAY 팝업이 뜨고 🔁 아이콘을 누르면 게임 재시작

#### 주요 내용
* `random` 함수로 두 숫자 사이의 랜덤한 숫자를 구한 다음 캐릭터들의 x, y 위치값으로 설정해준다.
* field에 랜덤 위치값을 가진 캐릭터들을 append로 추가해주면 게임을 재생할 때 마다 캐릭터들이 각기 다른 위치값을 가진다.
* event.target으로 클릭한 캐릭터가 backpack인지 else인지 구분하고 backpack이면 캐릭터를 삭제하고 score를 1씩 증가시킨 후 바뀐 score를 점수판에 업데이트한다.
* else를 클릭하면 캐릭터 삭제하고 hearCount를 증가시킨다. hearCount가 5가 되면 게임이 종료된다.
* 게임에서 이기면 win, 제한 시간안에 짱구를 다 찾지 못하거나 5개의 하트를 모두 사용한 경우 lose, 게임 도중에 중지 버튼을 누르면 cancel이 전달되고 그에 맞는 popup이 뜬다.
* refresh 버튼을 클릭하면 start 함수가 호출돼서 게임을 다시 재생할 수 있다.

#### 문제 해결
* 캐릭터들이 랜덤 배치 될 때 필드 영역 바깥에서도 배치 되는 경우가 있었다.
  * 캐릭터들의 크기값만큼 오버되서 배치되는거였다. x, y 값을 잡을 때 캐릭터의 크기값을 빼주니까 원하는 필드 영역 안으로 잘 배치되었다.
* 짱구를 클릭해도 게임 점수가 점수판에 반영되지 않았다.
  * querySelector로 가져온 점수판 gameScore와 짱구를 클릭하게 되면 1씩 증가하게 되는 score 변수를 제대로 구분하지 못하고 코딩을 해서 발생한 문제였다. 앞으로 변수 이름을 정할 때 어떤 정보를 담고 있는지, 다른 변수와 헷갈릴만큼 중복되는 단어는 없는지 명확하게 해야겠다고 생각하는 계기가 되었다.
* 게임이 중지되거나 종료되었을 때 팝업이 뜨고나면 필드를 클릭해도 작동이 되면 안되는데 클릭하면 캐릭터들이 사라지는 오류가 발생했다
  * field를 onClick 했을 때 started가 false면 return 되도록 해야하는데 리팩토링하는 과정에서 game.js의 started를 가져오는 방법을 알아내지 못했다. 그래서 결국 게임이 종료되거나 중지되었을 때 field에 class를 추가했다. game-field-stop에서 pointer-events를 none으로 설정해서 game-field-stop 클래스를 가지게 되면 클릭이 먹히지 않도록 해주었고 게임 재시작을 하게되면 다시 클래스를 제거해서 클릭할 수 있도록 하였다.


#### 배포 링크 📌
https://cute-mooncake-7dfe3f.netlify.app/
