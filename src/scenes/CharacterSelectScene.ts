import PhaserSceneTool from "./PhaserSceneTool";

class CharacterSelectScene extends PhaserSceneTool {
    constructor() {
        super("CharacterSelectScene");

    }

    create() {
        // this.add.sprite(100, 100, 'backButton')

        this.cameras.main.setBackgroundColor('#d3d3ff');

        const width = this.scale.width;
        const height = this.scale.height;

        // 1. 타이틀 텍스트
        this.add.text(width / 2, 80, '캐릭터를 선택하세요', {
            fontSize: '36px',
            fill: '#222222',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // 2. 캐릭터 데이터 정의
        this.characters = [
            { id: 'aris', name: '텐도 아리스', stats: '공격력: 보통 | 각성기: 빛이여' },
            { id: 'momoi', name: '사이바 모모이', stats: '공격력: 높음 | 각성기: 분노의 탄환' },
            { id: 'malfoi', name: '드라코니아 말포이', stats: '공격력: 낮음 | 각성기: 크루시오' },
        ];

        this.currentIndex = 0;
        this.currentIndex2 = 0;

        this.createCharacterSelectUi()

        // 5. 선택 완료 버튼
        const selectButtonBg = this.add.rectangle(width / 2, height - 120, 200, 50, 0x00aa00)
            .setInteractive();

        this.add.text(width / 2, height - 120, '게임 시작', {
            fontSize: '20px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        selectButtonBg.on('pointerdown', () => {
            const selectedChar = this.characters[this.currentIndex];
            const selectedChar2 = this.characters[this.currentIndex2];

            // GameScene으로 데이터 전달하며 씬 전환
            this.scene.start('GameScene', {
                selectedCharacter: selectedChar,
                selectedCharacter2: selectedChar2
            });
        });
    }

    createCharacterSelectUi() {
        const width = this.scale.width;
        const height = this.scale.height;

        // 3. UI 요소 생성 (캐릭터 이미지, 이름, 스탯 텍스트)
        this.charImage = this.add.image(
            width / 2 - 220,
            height / 2 - 70,
            this.characters[this.currentIndex].id)
            .setDisplaySize(320, 320);

        this.nameText = this.add.text(
            width / 2 - 220,
            height / 2 + 60, this.characters[this.currentIndex].name, {
            fontSize: '24px',
            fill: '#ffdd00',
            stroke: '#000000',
            strokeThickness: 4,
        }).setOrigin(0.5);

        this.statsText = this.add.text(
            width / 2 - 220
            , height / 2 + 100, this.characters[this.currentIndex].stats, {
            fontSize: '16px',
            fill: '#444444'
        }).setOrigin(0.5);

        // 4. 좌우 선택 버튼 만들기
        const leftButton = this.add.text(
            width / 2 - 150 - 220,
            height / 2 - 30, '<', { fontSize: '48px', fill: '#ffffff' })
            .setInteractive()
            .setOrigin(0.5);

        const rightButton = this.add.text(
            width / 2 + 150 - 220,
            height / 2 - 30, '>', { fontSize: '48px', fill: '#ffffff' })
            .setInteractive()
            .setOrigin(0.5);

        leftButton.on('pointerdown', () => this.changeCharacter(-1));
        rightButton.on('pointerdown', () => this.changeCharacter(1));

        // 3. UI 요소 생성 (캐릭터 이미지, 이름, 스탯 텍스트)
        this.charImage2 = this.add.image(
            width / 2 + 220,
            height / 2 - 70,
            this.characters[this.currentIndex2].id)
            .setDisplaySize(320, 320);

        this.nameText2 = this.add.text(
            width / 2 + 220,
            height / 2 + 60,
            this.characters[this.currentIndex2].name, {
            fontSize: '24px',
            fill: '#ffdd00',
            stroke: '#000000',
            strokeThickness: 4,
        }).setOrigin(0.5);

        this.statsText2 = this.add.text(
            width / 2 + 220
            , height / 2 + 100,
            this.characters[this.currentIndex2].stats, {
            fontSize: '16px',
            fill: '#444444'
        }).setOrigin(0.5);

        // 4. 좌우 선택 버튼 만들기
        const leftButton2 = this.add.text(
            width / 2 - 150 + 220,
            height / 2 - 30, '<', { fontSize: '48px', fill: '#ffffff' })
            .setInteractive()
            .setOrigin(0.5);

        const rightButton2 = this.add.text(
            width / 2 + 150 + 220,
            height / 2 - 30, '>', { fontSize: '48px', fill: '#ffffff' })
            .setInteractive()
            .setOrigin(0.5);

        leftButton2.on('pointerdown', () => this.changeCharacter2(-1));
        rightButton2.on('pointerdown', () => this.changeCharacter2(1));
    }

    changeCharacter(direction) {
        this.currentIndex += direction;

        if (this.currentIndex < 0) {
            this.currentIndex = this.characters.length - 1;
        } else if (this.currentIndex >= this.characters.length) {
            this.currentIndex = 0;
        }

        const char = this.characters[this.currentIndex];
        this.charImage.setTexture(char.id);
        this.nameText.setText(char.name);
        this.statsText.setText(char.stats);
    }

    changeCharacter2(direction) {
        this.currentIndex2 += direction;

        if (this.currentIndex2 < 0) {
            this.currentIndex2 = this.characters.length - 1;
        } else if (this.currentIndex2 >= this.characters.length) {
            this.currentIndex2 = 0;
        }

        const char = this.characters[this.currentIndex2];
        this.charImage2.setTexture(char.id);
        this.nameText2.setText(char.name);
        this.statsText2.setText(char.stats);
    }

}

export default CharacterSelectScene