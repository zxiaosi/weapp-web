package com.zxiaosi.weapp.service.impl;

import com.zxiaosi.common.entity.Word;
import com.zxiaosi.common.mapper.WordMapper;
import com.zxiaosi.weapp.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 单词服务实现类
 *
 * @author zxiaosi
 * @date 2024/8/22 下午11:35
 */
@Service
public class WordServiceImpl implements WordService {

    @Autowired
    private WordMapper wordMapper;

    @Override
    public List<Word> getWordListService() {
        return wordMapper.getWordList();
    }

    @Override
    public Word getWordService(Integer id) {
        return wordMapper.getWordDetail(id);
    }

    @Override
    public void addWordService(Word word) {
        wordMapper.addWord(word);
    }

    @Override
    public void updateWordService(Word word) {
        wordMapper.updateWord(word);
    }

    @Override
    public void favoritesWordService(Integer id) {
        wordMapper.favoritesWord(id);
    }

    @Override
    public void cancelFavoritesWordService(Integer id) {
        wordMapper.cancelFavoritesWord(id);
    }

    @Override
    public List<Word> getFavoritesWordListService() {
        return wordMapper.getFavoritesWordList();
    }
}
