/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { ApiRequest } from '../ApiRequest';
import { getListFriend, getVisitProfile } from '../Until';
import { PaginateInterface, ProfileInterface, VisitProfile } from '../AppInterface';
import axios from 'axios';
import { getCacheUser } from '../LocalCache';

jest.spyOn(axios, 'post');
jest.spyOn(axios, 'get');

beforeEach(() => {
  ApiRequest.token = "H3FizGTaUakQUQjlFAtki41lOjHOURTyXATmxsXV";
  ApiRequest.applicationId = "10";
})

describe('TEST API', () => {
  test('visit profile', async () => {
    let r:VisitProfile | null = await getVisitProfile(5);
    expect(r?.friends).not.toBeUndefined();
    expect(r?.friends).not.toBeNull();
    expect(r?.friends).not.toBeNaN();
    expect(r?.posts).not.toBeUndefined();
    expect(r?.posts).not.toBeNull();
    expect(r?.posts).not.toBeNaN();
    expect(r).toHaveProperty('profile.id', 5);
    let r1 = await getVisitProfile(-1);
    expect(r1).toBeNull();
    let cacheUser = getCacheUser(5);
    expect(r).toEqual(cacheUser);
    let cacheUserNotFound = getCacheUser(-1);
    expect(cacheUserNotFound).toBeUndefined();
  });

  test('list friend', async () => {
    let r:PaginateInterface | null = await getListFriend();
    expect(r).not.toBeNull();
  });
  
});