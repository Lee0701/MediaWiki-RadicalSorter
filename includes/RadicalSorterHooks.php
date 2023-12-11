<?php

use MediaWiki\MediaWikiServices;

require_once('Dictionary.php');

class RadicalSorterHooks {
    public static function onGetDefaultSortkey( $title, &$sortkey ) {
        $result = "";
        $chars = preg_split('//u', $title->getText(), -1, PREG_SPLIT_NO_EMPTY);
        $len = count($chars);
        for( $i = 0 ; $i < $len ; $i++ ) {
            if( !array_key_exists( $chars[$i], Dictionary::$dictionary ) ) {
                $result .= $chars[$i];
            } else {
                $item = Dictionary::$dictionary[$chars[$i]];
                $radical = Dictionary::$radicals[$item[0] - 1];
                $result .= $radical . $item[1];
            }
        }
        $sortkey = $result;
    }
}

?>
