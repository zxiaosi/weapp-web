import MyLayout from "@/components/myLayout";
import { Button, ScrollView, View } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import styles from "./index.module.scss";
import { getFavoriteListApi, getWordListApi, updateWordApi } from "@/apis";
import { useEffect, useState } from "react";
import { WordApi } from "@/apis/model";
import { AtDivider, AtIcon, AtMessage, AtTabs, AtTabsPane } from "taro-ui";

/** 题库类型 */
const wordType = 2;

/** 中化大题 */
const Index = () => {
  const router = useRouter();

  const routerParams = JSON.parse(router?.params?.item || "{}");

  const [current, setCurrent] = useState(0);

  const [currentWord, setCurrentWord] = useState<WordApi>({});

  const [isShowTranslation, setIsShowTranslation] = useState(false);

  const [favoriteList, setFavoriteList] = useState<WordApi[]>([]);

  /** 获取单词列表 */
  const getWordList = async () => {
    try {
      const resp = await getWordListApi(wordType);
      const words = resp.data?.data;
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
      const resp = await getFavoriteListApi(wordType);
      const words = resp.data.data;
      setFavoriteList(words);
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
    setIsShowTranslation(false);
    if (value === 0) getWordList();
    else getFavoriteWordList();
  };

  /** 查看释义 */
  const handleShowTranslation = () => {
    setIsShowTranslation(true);
  };

  /** 收藏 */
  const handleFavorite = async () => {
    const resp = await updateWordApi({ ...currentWord, favorites: 1 });
    setCurrentWord(resp.data.data);
    Taro.atMessage({ message: "收藏成功", type: "success" });
  };

  /** 取消收藏 */
  const handleCancelFavorite = async () => {
    const resp = await updateWordApi({ ...currentWord, favorites: 0 });
    setCurrentWord(resp.data.data);
    Taro.atMessage({ message: "取消收藏成功", type: "success" });
  };

  /** 收藏页收藏事件 */
  const handleFavoriteInFavorites = async (item: WordApi) => {
    const favorites = item.favorites === 1 ? 0 : 1;
    const resp = await updateWordApi({ ...item, favorites });
    const idx = favoriteList.findIndex((_) => _.id === item.id);
    const newFavorites = [...favoriteList];
    newFavorites.splice(idx, 1, resp.data.data);
    setFavoriteList(newFavorites);
    Taro.atMessage({
      message: favorites === 1 ? "收藏成功" : "取消收藏成功",
      type: "success",
    });
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
              <View className={styles.word}>
                <View className={styles.text}>{currentWord.title}</View>
              </View>
              {isShowTranslation && (
                <View className={styles.translation}>
                  <View className={styles.text}>{currentWord.translation}</View>
                </View>
              )}
            </View>

            {/* <Button
              plain
              type="primary"
              className={styles.btn}
              disabled={!currentWord.id}
              onClick={handleShowTranslation}
            >
              查看释义
            </Button> */}

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
              {favoriteList.map((_: WordApi) => (
                <View className={styles.item}>
                  <View className={styles.left}>
                    <View className={styles.word}>{_.title}</View>
                    <View className={styles.translation}>{_.translation}</View>
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
