origin/master = 원격
master = 로컬 저장소 

## commend
<> = 변경가능

1. 기본 생성
git add <filename or .>
git commit -m '<message>'
git remote add <origin> <http~>
git push <origin> <master>

git remote rm <name> - 저장소 삭제
git remote rename <origin-name> <new-name>  
git push <remote-name> --delete <branch-name>  - 리모트 브랜치 삭제


2. 클론
git clone <http~ .>    


3. 브랜치
git branch <name>   - 브랜치 생성
git checkout <name>  - 브랜치 이동


4. 병합 (가져오고 싶은 쪽에서)
git merge <origin>/<branch-name>
<!-- 충돌:  -->
1. newBranch 라는 이름의 브랜치를 하나 만듬
2. 마스터에 존재하는 a.js를 newBranch의 a.js 를 수정하고 푸시함
3. 근데 마스터에서도 a.js의 같은줄을 수정함 ..
4. 그리고 마스터에서 newBranch를 머지하면 충돌이 남(선택하면됨)
<!-- //충돌 -->



5. 오픈소스에 기여하기 위해서는.. 컬래버래이터에게 요청을 해야할까 ? 
    - 저장소를 포크해서 수정/추가 한 다음 주인에게 요청하면 됨

6. 협업 작업 방식 (브랜치, 포크)
    - 브랜치: 하나의 원본저장소에서 분기를 나눠 작업. 너무 많은 작업자가 생기면 브랜치 관리 힘듦
    - 포크: 여러 원격 저장소를 나눔. 원본저장소의 이력을 계속 추적하려면 "주소를 추가" 해줘야함

7. 포크 
    - fork -> clone -> 추적할 원격저장소 추가 git remote add $name $http~


8. 풀리퀘스트 (4번에서 포크로 가져온 원본 저장소에 내꺼 반영해달라고 요청하는거)
    - 협업할 땐 직접 머지하는것보다 풀리퀘스트로 머지를 요청하는게 좋음(pr 리뷰)
    - 방법
    1. 깃헙으로 이동 
    2. Contribute -> pull request 버튼클릭 -> 정보확인 후 create pull request 버튼 클릭 -> 변경점 등 메시지 스크린샷 등을 적어서 보냄 
    # 받는쪽에서도 files changed로 변경내용 확인 후 메시지 보내주고 merge pull request 버튼으로 머지 할 수 있음








## 협업 권한추가. 컬래버래이터
github -> setting -> manage access -> add people button click






## 주의사항
1. 커밋은 의미있는 변동사항을 묶어서 만들어야함
    - 예를 들어 버튼 버그를 고쳤다면 버튼 버그만 수정 후 묶어서 커밋을 해야 돌아갈 때 편함

2. 브랜치는 기능별로 쪼개는게 좋음
    



## 팁
1. 커밋을 한번 했을 때 조금 더 추가할 때... cli에서는 찾아봐야됨
    - ammend (마지막 커밋수정..이건 조심해야됨. 혼자쓰는 브랜치에서 해야됨)

2. 작업하던 브랜치에서 커밋을 안올리고 다른 브랜치로 이동해야될 때 작업파일 킵해두는 법
    - stash 
    - 다시 돌아올때 팝해주면 됨...cli에서는 찾아봐야됨

3. 커밋 되돌릴떄 
    - git reset: 커밋 취소하기
    - git revert: 커밋 내용 되돌리기
    - git commit –amend: 커밋 덮어쓰기

4. 버전 되돌릴때
    - 절대 같이 쓰는 곳에선 강제 push 하면 안됨
    - 