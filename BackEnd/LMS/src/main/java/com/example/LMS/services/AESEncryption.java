package com.example.LMS.services;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.security.Key;

public class AESEncryption {

    private static final String ALGORITHM = "AES";
    private static final String myEncryptionKey = "hello12345678901";  // it should be 16 bytes
    private static final String UNICODE_FORMAT = "UTF8";

    public static String encrypt (String valueToEnc) throws Exception{

        Key key = generateKey();
        Cipher c = Cipher.getInstance(ALGORITHM);
        c.init(Cipher.ENCRYPT_MODE, key);
        byte[] encValue = c.doFinal(valueToEnc.getBytes());
        String encryptedValue = Base64.getEncoder().encodeToString(encValue);
        return encryptedValue;

    }

    public static String decrypt (String encryptedValue) throws Exception{

        Key key = generateKey();
        Cipher c = Cipher.getInstance(ALGORITHM);
        c.init(Cipher.DECRYPT_MODE, key);
        
        byte[] decordedValue = Base64.getDecoder().decode(encryptedValue);
        byte[] decValue = c.doFinal(decordedValue);
        String decryptedValue = new String(decValue);
        return decryptedValue;

    }



    private static Key generateKey() throws Exception{

        byte[] keyAsBytes;
        keyAsBytes = myEncryptionKey.getBytes(UNICODE_FORMAT);
        Key key = new SecretKeySpec(keyAsBytes, ALGORITHM);
        return key;

    }

    public static void main(String[] args) throws Exception {

        System.out.println(encrypt("anilver2290"));

        System.out.println(decrypt("x7NXg6OrQBDsUyO797+Tyw=="));

        


        
    }

    
}
