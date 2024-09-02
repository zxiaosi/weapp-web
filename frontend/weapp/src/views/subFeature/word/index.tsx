import MyLayout from "@/components/myLayout";
import { Button, ScrollView, View } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import styles from "./index.module.scss";
import {
  cancelFavoriteWordApi,
  favoriteWordApi,
  getFavoriteListApi,
  getWordListApi,
} from "@/apis";
import { useEffect, useState } from "react";
import { WordApi } from "@/apis/model";
import {
  AtDivider,
  AtIcon,
  AtList,
  AtListItem,
  AtMessage,
  AtTabs,
  AtTabsPane,
} from "taro-ui";

const Index = () => {
  const router = useRouter();

  const routerParams = JSON.parse(router?.params?.item || "{}");

  const [current, setCurrent] = useState(0);

  const [currentWord, setCurrentWord] = useState<WordApi>({});

  const [isShowTranslation, setIsShowTranslation] = useState(false);

  const [favorites, setFavorites] = useState([]);

  /** 获取单词列表 */
  const getWordList = async () => {
    try {
      const resp = await getWordListApi();
      const words = resp.data.data;
      const randomWord = words[Math.floor(Math.random() * words.length)];
      console.log(randomWord);
      setCurrentWord(randomWord);
    } catch (error) {
      Taro.atMessage({ message: "获取单词列表失败", type: "error" });
    }
  };

  /** 获取单词收藏列表 */
  const getFavoriteWordList = async () => {
    try {
      const resp = await getFavoriteListApi();
      const words = resp.data.data;
      setFavorites(words);
    } catch (error) {
      Taro.atMessage({ message: "获取单词列表失败", type: "error" });
    }
  };

  /** 初始化 */
  useEffect(() => {
    getWordList();
  }, []);

  /** tab切换事件 */
  const handleTabChange = (value) => {
    setCurrent(value);
    if (value === 0) getWordList();
    else getFavoriteWordList();
  };

  /** 查看释义 */
  const handleShowTranslation = () => {
    setIsShowTranslation(true);
  };

  /** 收藏 */
  const handleFavorite = async () => {
    const resp = await favoriteWordApi(Number(currentWord.id));
    setCurrentWord(resp.data.data);
    Taro.atMessage({ message: "收藏成功", type: "success" });
  };

  /** 取消收藏 */
  const handleCancelFavorite = async () => {
    const resp = await cancelFavoriteWordApi(Number(currentWord.id));
    setCurrentWord(resp.data.data);
    Taro.atMessage({ message: "取消收藏成功", type: "success" });
  };

  /** 收藏页收藏事件 */
  const handleFavoriteInFavorites = async (item: WordApi) => {
    if (item.favorites === 1) {
      const resp = await cancelFavoriteWordApi(item.id);
      const idx = favorites.findIndex((_) => _.id === item.id);
      const newFavorites = [...favorites];
      newFavorites.splice(idx, 1, resp.data.data);
      setFavorites(newFavorites);
      Taro.atMessage({ message: "取消收藏成功", type: "success" });
      return;
    } else {
      const resp = await favoriteWordApi(item.id);
      const idx = favorites.findIndex((_) => _.id === item.id);
      const newFavorites = [...favorites];
      newFavorites.splice(idx, 1, resp.data.data);
      setFavorites(newFavorites);
      Taro.atMessage({ message: "收藏成功", type: "success" });
    }
  };

  /** 下一个 */
  const handleNextWord = () => {
    setIsShowTranslation(false);
    getWordList();
  };

  return (
    <MyLayout
      isUseBgColor={true}
      leftIcon="chevron-left"
      title={routerParams?.name}
      backFunc={() => Taro.navigateBack()}
    >
      <AtMessage />
      <View className={styles.page}>
        <AtTabs
          current={current}
          scroll
          tabList={[{ title: "单词" }, { title: "收藏" }]}
          onClick={handleTabChange}
        >
          <AtTabsPane index={0} current={0}>
            <View className={styles.top}>
              <View className={styles.word}>{currentWord.word}</View>
              {isShowTranslation && (
                <View className={styles.translation}>
                  <View>{currentWord.translation1}</View>
                  <View>{currentWord.translation2}</View>
                </View>
              )}
            </View>

            <Button
              plain
              type="primary"
              className={styles.btn}
              disabled={!currentWord.id}
              onClick={handleShowTranslation}
            >
              查看释义
            </Button>

            {currentWord.favorites === 0 ? (
              <Button
                plain
                type="primary"
                className={styles.btn}
                disabled={!currentWord.id}
                onClick={handleFavorite}
              >
                收藏
              </Button>
            ) : (
              <Button
                plain
                type="primary"
                className={styles.btn}
                style={{ background: "red" }}
                disabled={!currentWord.id}
                onClick={handleCancelFavorite}
              >
                取消收藏
              </Button>
            )}

            <Button
              plain
              type="primary"
              className={styles.btn}
              disabled={!currentWord.id}
              onClick={handleNextWord}
            >
              下一个
            </Button>
          </AtTabsPane>

          <AtTabsPane index={1} current={1}>
            <ScrollView scrollY className={styles.scroll}>
              {/* <AtList hasBorder={true}>
                {favorites.map((_: WordApi) => (
                  <AtListItem
                    title={_.word}
                    note={`${_.translation1} | ${_.translation2}`}
                  />
                ))}
              </AtList> */}
              {favorites.map((_: WordApi) => (
                <View className={styles.item}>
                  <View className={styles.left}>
                    <View className={styles.word}>{_.word}</View>
                    <View className={styles.translation}>
                      {_.translation1}
                      {_.translation2 && `|| ${_.translation2}`}
                    </View>
                  </View>

                  <View className={styles.right}>
                    <AtIcon
                      value={_.favorites === 0 ? "star" : "star-2"}
                      size="20"
                      color="#4da1fc"
                      onClick={() => handleFavoriteInFavorites(_)}
                    ></AtIcon>
                  </View>
                </View>
              ))}
              <AtDivider content="没有更多啦~" />
            </ScrollView>
          </AtTabsPane>
        </AtTabs>
      </View>
    </MyLayout>
  );
};

export default Index;
