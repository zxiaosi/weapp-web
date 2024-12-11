package com.zxiaosi.weapp.service.impl;

import com.zxiaosi.common.entity.Word;
import com.zxiaosi.common.mapper.WordMapper;
import com.zxiaosi.weapp.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
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
    public List<Word> getWordListByTypeService(Integer type) {
        return wordMapper.getWordListByType(type);
    }

    @Override
    public Word getWordByIdAndTypeService(Integer id, Integer type) {
        return wordMapper.getWordByIdAndType(id, type);
    }

    @Override
    public void updateWordService(Word word) {
        wordMapper.updateWord(word);
    }

    @Override
    public List<Word> getFavoritesWordListByTypeService(Integer type) {
        return wordMapper.getFavoritesWordListByType(type);
    }
}
